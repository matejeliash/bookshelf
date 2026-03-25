package dev.matejeliash.bookshelf.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookDto {

    private String openLibId;
    private String title;
    private String description;

    private List<String> openLibAuthorIds;
    private List <String> authorNames;

    private Boolean like;
    private Integer rating;
    private String review;
    private String cover;

    
}
