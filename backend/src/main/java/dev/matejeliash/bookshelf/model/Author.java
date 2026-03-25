package dev.matejeliash.bookshelf.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="authors") // must change users is reserved table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false,unique = true)
    private String openLibId;

    @Column(nullable=false)
    private String name;


    @Override
    public boolean equals(Object o){
        if(this == o) return true;

        if(!(o instanceof Author)) return false;
        Author author = (Author) o;
        return openLibId != null  && openLibId.equals(author.openLibId);
    }

    public int hashCode(){
        return openLibId != null ? openLibId.hashCode() : 0 ;
    }
    
}