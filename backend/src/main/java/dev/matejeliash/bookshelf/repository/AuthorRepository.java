package dev.matejeliash.bookshelf.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.matejeliash.bookshelf.model.Author;

public interface AuthorRepository extends JpaRepository<Author,Long>{
    
    Optional<Author> findByName(String name);

    Optional<Author> findByOpenLibId(String openLibId);

    
}