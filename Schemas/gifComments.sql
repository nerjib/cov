CREATE TABLE IF NOT EXISTS
      gifComments(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        comment TEXT NOT NULL,
        gifID TEXT NOT NULL,
        post_date TIMESTAMP,
        FOREIGN KEY (userid) REFERENCES gifs(id)
      )