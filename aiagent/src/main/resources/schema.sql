-- Table 1: users - Dùng cho Tầng Security & JWT
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'USER_FREE' -- USER_FREE, USER_VIP để phân quyền gọi AI
);

-- Table 2: ai_agents - Tầng Router Gateway
CREATE TABLE IF NOT EXISTS ai_agents(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,  -- Ví dụ: 'GPT-4o Mini', 'Gemini 1.5 Flash'
    provider VARCHAR(50) NOT NULL,  -- Ví dụ: 'OPENAI', 'GOOGLE', 'LOCAL'
    api_url VARCHAR(500) NOT NULL,  -- URL endpoint của bên thứ 3
    status VARCHAR(20) DEFAULT 'ACTIVE' -- ACTIVE, INACTIVE
);

-- Table 3: ai_usage_logs - Dùng cho R2DBC Non-blocking Log
CREATE TABLE IF NOT EXISTS ai_usage_logs(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    agent_id BIGINT NOT NULL,
    prompt TEXT NOT NULL,
    tokens_consumed INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
