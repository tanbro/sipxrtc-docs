# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

mkdocs is ok.

[mkdocs] is fine.

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

???+ example "Hello world 例子"

    === "C"
    
        ```c
        #include <stdio.h>
    
        int main(void) {
            printf("Hello world!\n");
            return 0;
        }
        ```
    
    === "C++"
    
        ```c++
        #include <iostream>
    
        int main(void) {
            std::cout << "Hello world!" << std::endl;
            return 0;
        }
        ```

测试

???+ example "例子 2"

    === "C"
    
        ```c
        // C
        ```
    
    === "C++"
    
        ```c++
        // C++
        ```

    === "Python"

        ```python
        print("Hello world")
        ```
