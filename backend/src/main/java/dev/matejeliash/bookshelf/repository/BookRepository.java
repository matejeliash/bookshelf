package dev.matejeliash.bookshelf.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.matejeliash.bookshelf.model.Book;

public interface BookRepository extends JpaRepository<Book,Long>{

    Optional<Book> findByOpenLibId(String openLibId);
}

    
