# DMT Deployment & DevOps Guide

## Development Environment Setup

### Local Development

```bash
# Clone the repository
git clone https://github.com/Asad-960/DMT.git
cd DMT

# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Docker Setup

### Build Docker Image

```bash
# From the frontend directory
docker build -t dmt-frontend:latest .

# Run the container
docker run -p 3000:3000 dmt-frontend:latest
```

### Docker Compose (Full Stack)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api/v1
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/dmt
      REDIS_URL: redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: dmt
      POSTGRES_USER: dmt_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Run Docker Compose

```bash
docker-compose up -d
```

## Kubernetes Deployment

### Prerequisites
- kubectl installed
- Kubernetes cluster configured
- Docker images pushed to registry

### Namespace Setup

```bash
kubectl create namespace dmt
kubectl config set-context --current --namespace=dmt
```

### ConfigMap & Secrets

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: dmt-config
  namespace: dmt
data:
  NEXT_PUBLIC_API_URL: "https://api.dmt.dental/api/v1"
  NODE_ENV: "production"

---
apiVersion: v1
kind: Secret
metadata:
  name: dmt-secrets
  namespace: dmt
type: Opaque
stringData:
  DATABASE_URL: "postgresql://user:password@postgres:5432/dmt"
  REDIS_URL: "redis://redis:6379"
  JWT_SECRET: "your-secret-key-here"
  API_KEY: "your-api-key-here"
```

### Frontend Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dmt-frontend
  namespace: dmt
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dmt-frontend
  template:
    metadata:
      labels:
        app: dmt-frontend
    spec:
      containers:
      - name: frontend
        image: your-registry/dmt-frontend:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: dmt-config
        - secretRef:
            name: dmt-secrets
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: dmt-frontend-service
  namespace: dmt
spec:
  selector:
    app: dmt-frontend
  type: LoadBalancer
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: dmt-frontend-hpa
  namespace: dmt
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: dmt-frontend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## CI/CD Pipeline

### GitHub Actions Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy DMT

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run linter
      run: |
        cd frontend
        npm run lint
    
    - name: Type check
      run: |
        cd frontend
        npm run type-check
    
    - name: Build
      run: |
        cd frontend
        npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Build and push Docker image
      run: |
        cd frontend
        docker build -t dmt-frontend:${{ github.sha }} .
        docker tag dmt-frontend:${{ github.sha }} dmt-frontend:latest
        # Push to registry
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/dmt-frontend \
          dmt-frontend=dmt-frontend:${{ github.sha }} \
          -n dmt
        kubectl rollout status deployment/dmt-frontend -n dmt
```

## Environment Variables

### Production Environment

```
NEXT_PUBLIC_API_URL=https://api.dmt.dental/api/v1
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=DMT
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Staging Environment

```
NEXT_PUBLIC_API_URL=https://staging-api.dmt.dental/api/v1
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=DMT (Staging)
NEXT_PUBLIC_APP_VERSION=1.0.0-staging
```

## Monitoring & Logging

### Datadog Integration

```yaml
# datadog-agent-config
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-agent-config
  namespace: dmt
data:
  logs.yaml: |
    logs:
      - type: file
        path: /var/log/dmt/*.log
        service: dmt-frontend
        source: docker
```

### Health Check Endpoints

- **Liveness**: `GET /health` - Returns 200 if service is alive
- **Readiness**: `GET /ready` - Returns 200 if service is ready for traffic

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily automated backup
pg_dump dmt_database > backup_$(date +%Y%m%d).sql

# Restore from backup
psql dmt_database < backup_20240527.sql
```

### RTO & RPO
- **RTO (Recovery Time Objective)**: 1 hour
- **RPO (Recovery Point Objective)**: 30 minutes

## Scaling Strategy

### Horizontal Scaling

```bash
# Scale frontend replicas
kubectl scale deployment dmt-frontend --replicas=5 -n dmt

# Check status
kubectl get deployment dmt-frontend -n dmt
```

### Vertical Scaling

Update resource requests in deployment YAML:

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

## Performance Optimization

### Frontend Optimization
- Next.js image optimization
- Code splitting and lazy loading
- CSS minification
- JavaScript bundling and tree-shaking

### Caching Strategy
- Redis for session caching
- CloudFront for CDN
- Browser caching headers
- Database query caching

## Security Best Practices

1. **Environment Variables**: Never commit secrets
2. **HTTPS**: Enforce TLS 1.3
3. **CORS**: Configure properly for API endpoints
4. **Rate Limiting**: Implement on all endpoints
5. **Input Validation**: Sanitize all inputs
6. **Regular Updates**: Keep dependencies updated
7. **Security Headers**: Implement CSP, HSTS, X-Frame-Options

## Rollback Procedure

### Kubernetes Rollback

```bash
# View rollout history
kubectl rollout history deployment/dmt-frontend -n dmt

# Rollback to previous version
kubectl rollout undo deployment/dmt-frontend -n dmt

# Rollback to specific revision
kubectl rollout undo deployment/dmt-frontend --to-revision=2 -n dmt
```

## Maintenance Windows

- **Weekly**: Code updates (Tuesdays 2-3 AM UTC)
- **Monthly**: Database maintenance (First Sunday 3-5 AM UTC)
- **Quarterly**: Major infrastructure updates

## Support & Documentation

- **Issues**: GitHub Issues
- **Documentation**: docs/ directory
- **Monitoring**: Datadog Dashboard
- **Logs**: CloudWatch Logs
- **Alerts**: PagerDuty

## Cost Optimization

- **Spot Instances**: Use for non-critical workloads
- **Reserved Capacity**: For predictable baseline
- **Auto-scaling**: Right-size resources
- **Data Transfer**: Optimize API responses
- **Storage**: Archive old logs and backups

---

For additional support, contact: devops@dmt.dental
