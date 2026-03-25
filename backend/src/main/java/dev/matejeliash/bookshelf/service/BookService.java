package dev.matejeliash.bookshelf.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import dev.matejeliash.bookshelf.dto.BookDto;
import dev.matejeliash.bookshelf.exception.APIException;
import dev.matejeliash.bookshelf.exception.ErrorCode;
import dev.matejeliash.bookshelf.model.Author;
import dev.matejeliash.bookshelf.model.Book;
import dev.matejeliash.bookshelf.model.User;
import dev.matejeliash.bookshelf.model.UserBook;
import dev.matejeliash.bookshelf.repository.AuthorRepository;
import dev.matejeliash.bookshelf.repository.BookRepository;
import dev.matejeliash.bookshelf.repository.UserBookRepository;
import dev.matejeliash.bookshelf.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final UserBookRepository userBookRepository;
    private final UserRepository userRepository;

    public BookService(BookRepository bookRepository,
        AuthorRepository authorRepository,
        UserBookRepository userBookRepository,
        UserRepository userRepository    ){
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.userBookRepository = userBookRepository;
        this.userRepository = userRepository;
    }




// @Transactional
// public void handleBookAndUserAction(BookDto dto, Long userId) {

//     // 1. Create or find book
//      Book book = bookRepository
//             .findByOpenLibId(dto.getOpenLibId())
//             .orElseGet(() -> {
//                 Book b = new Book();
//                 b.setOpenLibId(dto.getOpenLibId());
//                 b.setTitle(dto.getTitle());
//                 b.setDescription(dto.getDescription());
//                 return b;
//             });


//     // 2. Save authors
//     if (dto.getOpenLibAuthorIds() != null && dto.getAuthorNames() != null) {

//         List<Author> authors = new ArrayList<>();

//         int size = Math.min(
//                 dto.getOpenLibAuthorIds().size(),
//                 dto.getAuthorNames().size()
//         );

//         for (int i = 0; i < size; i++) {

//             String openLibId = dto.getOpenLibAuthorIds().get(i);
//             String name = dto.getAuthorNames().get(i);

//             Author author = authorRepository
//                     .findByOpenLibId(openLibId)
//                     .orElseGet(() -> {
//                         Author a = new Author();
//                         a.setOpenLibId(openLibId);
//                         a.setName(name);
//                         return authorRepository.save(a);
//                     });

//             authors.add(author);
//         }

//         book.setAuthors(authors);
//     }
//     // System.out.println("STEP 2");

//     // 3. Save book (ENSURE it exists before UserBook)
//     Book bookB = bookRepository.save(book);

//     // 4. Handle user action (UserBook)
//     UserBook userBook = userBookRepository
//             .findByUserIdAndBookId(userId, bookB.getId())
//             .orElseGet(() -> new UserBook(userId, bookB.getId()));

//     userBook.setLiked(dto.getLike());
//     // userBook.setRating(dto.getRating());
//     // userBook.setReview(dto.getReview());
//     userBook.setUpdatedAt(LocalDateTime.now());

//     userBookRepository.save(userBook);
// }



@Transactional
public void likeBook(BookDto dto, Long userId) {

    // 1. Find or create book from OpenLibrary data
    Book book = bookRepository
            .findByOpenLibId(dto.getOpenLibId())
            .orElseGet(() -> {
                Book b = new Book();
                b.setOpenLibId(dto.getOpenLibId());
                b.setTitle(dto.getTitle());
                b.setDescription(dto.getDescription());
                b.setCover(dto.getCover());
                return bookRepository.save(b); // save immediately
            });

    


    // 2. Save authors
    if (dto.getOpenLibAuthorIds() != null && dto.getAuthorNames() != null) {

        List<Author> authors = new ArrayList<>();

        int size = Math.min(
                dto.getOpenLibAuthorIds().size(),
                dto.getAuthorNames().size()
        );

        for (int i = 0; i < size; i++) {

            String openLibId = dto.getOpenLibAuthorIds().get(i);
            String name = dto.getAuthorNames().get(i);

            Author author = authorRepository
                    .findByOpenLibId(openLibId)
                    .orElseGet(() -> {
                        Author a = new Author();
                        a.setOpenLibId(openLibId);
                        a.setName(name);
                        return authorRepository.save(a);
                    });

            authors.add(author);
        }

        book.setAuthors(authors);
    }

     User user= userRepository.findById(userId).orElseThrow(
        () -> new APIException("user not found", ErrorCode.USER_NOT_FOUND,HttpStatus.FORBIDDEN)
     );

    // 2. Find or create UserBook relation
    UserBook userBook = userBookRepository
            .findByUserIdAndBookId(userId, book.getId())
            .orElseGet(() -> new UserBook(user,book ));

    // 3. Toggle like (or just set to true if you prefer)
    if (Boolean.TRUE.equals(userBook.getLiked())) {
        userBook.setLiked(false); // unlike
    } else {
        userBook.setLiked(true);  // like
    }

    userBook.setUpdatedAt(LocalDateTime.now());

    // 4. Save relation
    userBookRepository.save(userBook);
}


public List<BookDto> getUserLikedBooks(Long userId) {

    List<UserBook> userBooks = userBookRepository.findAllByUserId(userId);

    List <UserBook> userLikedBooks = userBooks.stream().filter( ub -> ub.getLiked() == true).toList();

    return userLikedBooks.stream().map(ub -> {

        Book book = bookRepository.findById(ub.getBook().getId())
                .orElseThrow(() -> new RuntimeException("Book not found"));



        BookDto dto = new BookDto();

        dto.setOpenLibId(book.getOpenLibId());
        dto.setTitle(book.getTitle());
        dto.setDescription(book.getDescription());
        dto.setCover(book.getCover());

        // Optional fields from UserBook
        dto.setLike(ub.getLiked());
        dto.setRating(ub.getRating());
        dto.setReview(ub.getReview());

        for(var a : book.getAuthors()){
            System.out.println(a.getName());
        }
        // Authors
        if (book.getAuthors() != null && book.getAuthors().size() > 0) {
            dto.setAuthorNames(
                book.getAuthors()
                    .stream()
                    .map(Author::getName)
                    .toList()
            );

            dto.setOpenLibAuthorIds(
                book.getAuthors().stream().map(Author::getOpenLibId).toList()
            );
        }


        return dto;

    }).toList();
}

    
}


