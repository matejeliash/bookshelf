package dev.matejeliash.bookshelf.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.matejeliash.bookshelf.model.UserBook;

public interface UserBookRepository extends JpaRepository<UserBook, Long> {

    Optional<UserBook> findByUserIdAndBookId(Long userId, Long bookId);

    List<UserBook> findByUserId(Long userId);

    List<UserBook> findByBookId(Long bookId);
    List<UserBook> findAllByUserId(Long userId);

    boolean existsByUserIdAndBookId(Long userId, Long bookId);
}