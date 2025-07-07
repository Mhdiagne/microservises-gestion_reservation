# Room Reservation Microservices System

## Architecture Overview

This project implements a microservices architecture for a room reservation management system using Spring Boot and Spring Cloud.

### Services

1. **Eureka Server** (Port 8761) - Service Discovery
2. **API Gateway** (Port 8080) - Entry point and routing
3. **Auth Service** (Port 8081) - Authentication and user management
4. **Room Service** (Port 8082) - Room management
5. **Reservation Service** (Port 8083) - Reservation management

### Technology Stack

- **Spring Boot 3.2.0** - Microservices framework
- **Spring Cloud 2023.0.0** - Microservices infrastructure
- **Netflix Eureka** - Service discovery
- **Spring Cloud Gateway** - API Gateway
- **H2 Database** - In-memory database for each service
- **JWT** - Authentication tokens
- **Spring Security** - Security framework
- **OpenFeign** - Service-to-service communication

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Running the Services

1. **Start Eureka Server**
   ```bash
   cd eureka-server
   mvn spring-boot:run
   ```

2. **Start API Gateway**
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

3. **Start Auth Service**
   ```bash
   cd auth-service
   mvn spring-boot:run
   ```

4. **Start Room Service**
   ```bash
   cd room-service
   mvn spring-boot:run
   ```

5. **Start Reservation Service**
   ```bash
   cd reservation-service
   mvn spring-boot:run
   ```

### API Endpoints

All requests go through the API Gateway at `http://localhost:8080`

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Token validation

#### Rooms
- `GET /api/rooms` - Get all rooms (with filters)
- `GET /api/rooms/{id}` - Get room by ID
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/{id}` - Update room
- `DELETE /api/rooms/{id}` - Delete room

#### Reservations
- `GET /api/reservations` - Get all reservations (with filters)
- `GET /api/reservations/{id}` - Get reservation by ID
- `POST /api/reservations` - Create new reservation
- `PUT /api/reservations/{id}` - Update reservation
- `PATCH /api/reservations/{id}/cancel` - Cancel reservation
- `DELETE /api/reservations/{id}` - Delete reservation

### Demo Users

The system comes with pre-configured demo users:

- **Admin**: admin@company.com / demo
- **Manager**: manager@company.com / demo
- **Employee**: employee@company.com / demo

### Database Access

Each service has its own H2 database console:

- Auth Service: http://localhost:8081/h2-console
- Room Service: http://localhost:8082/h2-console
- Reservation Service: http://localhost:8083/h2-console

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:[servicename]db`
- Username: `sa`
- Password: `password`

### Service Discovery

Access Eureka Dashboard at: http://localhost:8761

### Health Checks

- Eureka Server: http://localhost:8761/actuator/health
- API Gateway: http://localhost:8080/actuator/health
- Auth Service: http://localhost:8081/auth/health
- Room Service: http://localhost:8082/rooms/health
- Reservation Service: http://localhost:8083/reservations/health

## Architecture Benefits

1. **Scalability**: Each service can be scaled independently
2. **Resilience**: Failure in one service doesn't affect others
3. **Technology Diversity**: Each service can use different technologies
4. **Team Independence**: Different teams can work on different services
5. **Deployment Flexibility**: Services can be deployed independently

## Future Enhancements

- Add message broker (RabbitMQ/Kafka) for async communication
- Implement distributed tracing (Zipkin)
- Add monitoring (Prometheus/Grafana)
- Implement circuit breakers (Hystrix/Resilience4j)
- Add configuration server (Spring Cloud Config)
- Implement API rate limiting
- Add comprehensive logging (ELK stack)