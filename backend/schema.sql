CREATE TABLE IF NOT EXISTS leads (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)   NOT NULL,
  email       VARCHAR(255)   NOT NULL,
  phone_code  VARCHAR(10)    DEFAULT NULL,
  phone       VARCHAR(50)    DEFAULT NULL,
  company     VARCHAR(255)   DEFAULT NULL,
  message     TEXT           NOT NULL,
  source      VARCHAR(100)   DEFAULT 'website_contact_form',
  ip_address  VARCHAR(45)    DEFAULT NULL,
  user_agent  TEXT           DEFAULT NULL,
  status      ENUM('new','contacted','qualified','closed') NOT NULL DEFAULT 'new',
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status  (status),
  INDEX idx_email   (email),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
