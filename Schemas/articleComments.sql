CREATE TABLE IF NOT EXISTS
      comments(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        comment TEXT NOT NULL,
        articleID TEXT NOT NULL,
        post_date TIMESTAMP,
        FOREIGN KEY (userid) REFERENCES articles(id)

      )