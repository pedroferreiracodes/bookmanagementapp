package pedroferreiracodes.bookmanagementapp.book;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static java.time.Month.*;

@Configuration
public class BookConfig {

    @Bean
    CommandLineRunner commandLineRunner(
            BookRepository repository) {
        return args -> {
            Book eloquentJavaScript = new Book(
                    "Eloquent JavaScript",
                    "Marijn Haverbeke",
                    9781593279509L,
                    LocalDate.of(2018, DECEMBER, 4),
                    0.0);

            Book cleanCode = new Book(
                    "Clean Code",
                    "Robert Cecil Martin",
                    9780132350884L,
                    LocalDate.of(2008, AUGUST, 1),
                    28.67);

            repository.saveAll(
                    List.of(eloquentJavaScript, cleanCode)
            );
        };
    }
}
