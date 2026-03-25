package dev.matejeliash.bookshelf.service;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import dev.matejeliash.bookshelf.model.User;
import dev.matejeliash.bookshelf.repository.UserRepository;

// get user objects from DB
@Service
public class UserService {

    private final UserRepository userRepository;
    public  UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> allUsers(){
        List<User> users = new ArrayList<>();
        // copy to new list
        userRepository.findAll().forEach(users::add);

        return users;

    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
