package dev.matejeliash.bookshelf.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.matejeliash.bookshelf.model.User;
import dev.matejeliash.bookshelf.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    // private static final Logger log = LoggerFactory.getLogger(
    //     UserController.class
    // );

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Returns just username from user's session
    @GetMapping("/me")
    public ResponseEntity<String> autherticatedUser(
        @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(user.getUsername());
    }

    // JUST FOR TESTING , returns all users, do not show to user !!!
    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

    // Just for testing
    @GetMapping("/info")
    public ResponseEntity<String> info() {
        // log.info("just some info");
        return ResponseEntity.ok("just some info");
    }
}

