# Set some paths from conan before finding package
set(CMAKE_PROGRAM_PATH "${GRAPHVIZ_INSTALL_DIR};${DOXYGEN_INSTALL_DIR};${CMAKE_PROGRAM_PATH}")

if(CMAKE_HOST_UNIX)
    find_package(Doxygen REQUIRED dot )

    if (DOXYGEN_FOUND)
        set(DOXYGEN_PROJECT_NAME "Radio Control Layer (RCL)")
        set(DOXYGEN_OPTIMIZE_OUTPUT_FOR_C "YES")
        set(DOXYGEN_INLINE_GROUPED_CLASSES "YES")
        set(DOXYGEN_EXTRACT_ALL "YES")
        set(DOXYGEN_EXTRACT_PRIVATE "YES")
        set(DOXYGEN_EXTRACT_STATIC "YES")
        set(DOXYGEN_EXTRACT_ANON_NSPACES "NO")
        set(DOXYGEN_CASE_SENSE_NAMES "NO")
        set(DOXYGEN_SHOW_GROUPED_MEMB_INC "YES")
        set(DOXYGEN_SORT_MEMBER_DOCS "NO")
        set(DOXYGEN_GENERATE_TESTLIST "NO")
        set(DOXYGEN_GENERATE_BUGLIST "NO")
        set(DOXYGEN_GENERATE_TODOLIST "NO")
        set(DOXYGEN_SHOW_NAMESPACES "NO")
        set(DOXYGEN_LAYOUT_FILE "${PROJECT_SOURCE_DIR}/docs/rcl/source/DoxygenLayout.xml")
        set(DOXYGEN_FILE_PATTERNS "*.c" "*.h" "*.md" "*.png")
        set(DOXYGEN_EXCLUDE_PATTERNS "octopus")
        set(DOXYGEN_USE_MDFILE_AS_MAINPAGE "${PROJECT_SOURCE_DIR}/docs/rcl/source/rcl_product_overview.md")
        set(DOXYGEN_REFERENCED_BY_RELATION "YES")
        set(DOXYGEN_REFERENCES_RELATION "YES")
        set(DOXYGEN_HTML_EXTRA_STYLESHEET "${PROJECT_SOURCE_DIR}/docs/rcl/source/doxygen-awesome.css" "${PROJECT_SOURCE_DIR}/docs/rcl/source/doxygen-awesome-sidebar-only.css")
        set(DOXYGEN_HTML_DYNAMIC_SECTIONS "YES")
        set(DOXYGEN_GENERATE_TREEVIEW "YES")
        set(DOXYGEN_TREEVIEW_WIDTH "150")
        set(DOXYGEN_PLANTUML_JAR_PATH "${PLANTUML_INSTALL_DIR}/plantuml.jar")
        set(DOXYGEN_PLANTUML_CFG_FILE "${PROJECT_SOURCE_DIR}/docs/rcl/source/plantuml.cfg")
        set(DOXYGEN_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}) # Build directly in source
        set(DOXYGEN_STRIP_FROM_PATH ../../source)
        set(DOXYGEN_EXCLUDE_PATTERNS "mock_*.c" "mock_*.h" "*1308*")
        set(DOXYGEN_TYPEDEF_HIDES_STRUCT "YES")
        set(DOXYGEN_INLINE_SIMPLE_STRUCTS "YES")
        set(DOXYGEN_IMAGE_PATH "${PROJECT_SOURCE_DIR}/docs/rcl/source/images")
        set(DOXYGEN_ENABLE_PREPROCESSING "YES")
        set(DOXYGEN_PREDEFINED "DOXYGEN_SKIP")
        set(DOXYGEN_EXAMPLE_PATH "${PROJECT_SOURCE_DIR}/examples")

        doxygen_add_docs(docs
            ${CMAKE_CURRENT_SOURCE_DIR}/source/rcl_product_overview.md
            ${CMAKE_CURRENT_SOURCE_DIR}/source/rcl_architecture.md
            ${CMAKE_CURRENT_SOURCE_DIR}/source/rcl_api_overview.md
            ${CMAKE_CURRENT_SOURCE_DIR}/source/rcl_glossary.md
            ${CMAKE_CURRENT_SOURCE_DIR}/source/handlers
            ${CMAKE_CURRENT_SOURCE_DIR}/source/doc_chapters
            ${PROJECT_SOURCE_DIR}/source/ti/drivers/rcl
            ${RCL_INSTALL_DIR}/source/ti/drivers/rcl
        )

        # set_property(DIRECTORY APPEND PROPERTY
        #     ADDITIONAL_CLEAN_FILES "${PROJECT_SOURCE_DIR}/docs/tyr-trx/*.pu")

        # This is .. very slow
        # install(DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/html DESTINATION ${CMAKE_CURRENT_SOURCE_DIR}/html)
    endif (DOXYGEN_FOUND)
endif(CMAKE_HOST_UNIX)
