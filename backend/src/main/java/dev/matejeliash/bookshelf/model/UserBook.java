package dev.matejeliash.bookshelf.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



// @Entity
// @AllArgsConstructor
// @NoArgsConstructor
// @Getter
// @Setter
// @Table(
//     name = "user_books",
//     uniqueConstraints = {
//         @UniqueConstraint(columnNames = {"user_id", "book_id"})
//     }
// )
// public class UserBook {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private Long userId;

//     private Long bookId;

//     private Boolean owned;

//     private Boolean liked;

//     private Integer rating;

//     private String review;

//     private LocalDateTime updatedAt;


//     public UserBook(Long userId, Long bookId) {
//         this.userId = userId;
//         this.bookId = bookId;
//     }

// }



@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(
    name = "user_books",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "book_id"})
    }
)
public class UserBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    private Boolean owned = false;

    private Boolean liked = false;

    private Integer rating;

    private String review;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public UserBook(User user, Book book) {
        this.user = user;
        this.book = book;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}