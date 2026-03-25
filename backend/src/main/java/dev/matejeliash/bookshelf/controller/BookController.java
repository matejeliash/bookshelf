package dev.matejeliash.bookshelf.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.matejeliash.bookshelf.dto.BookDto;
import dev.matejeliash.bookshelf.model.User;
import dev.matejeliash.bookshelf.service.BookService;

@RestController
@RequestMapping("/books")
public class BookController {


    private BookService bookService;
    public BookController(BookService bookService){
        this.bookService =bookService;
    }


    @PostMapping("/like")
    public ResponseEntity<String> add(
        @RequestBody BookDto bookDto,
        @AuthenticationPrincipal User user
    ) {
        System.out.println(bookDto.getTitle());
        bookService.likeBook(bookDto, user.getId());;

        return ResponseEntity.ok("book added");
    }


    @GetMapping("/liked")
    public ResponseEntity<List<BookDto>> getLiked(
        @AuthenticationPrincipal User user
    ) {
        List<BookDto> liked = bookService.getUserLikedBooks(user.getId());

        return ResponseEntity.ok(liked);
    }

    
}
