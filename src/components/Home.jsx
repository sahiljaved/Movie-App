import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Avatar,
  Image,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Badge,
  CircularProgress,
} from "@chakra-ui/react";
import MovieModal from "./MovieModal";
import axios from "axios";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logo from "../assets/image/pngegg.png";
import userLogo from "../assets/image/user.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "Username";
  
  
  //state to store movie data
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //debounce satates
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [sortBy, setSortBy] = useState('');
  //select movie states
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true); 

      const apiKey = "ef788098";
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${debouncedSearchTerm}&apikey=${apiKey}`
        
      );

      if (response.data.Search) {
        const movieResults = response.data.Search;
        const detailedMovieData = await Promise.all(
          movieResults.map(async (movie) => {
            const detailedResponse = await axios.get(
              `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
            );
            return detailedResponse.data;
          })
        );
        setMovies(detailedMovieData);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  // Custom debounce function
  const debounce = (func, delay) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(func, delay);
    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    debounce(() => setDebouncedSearchTerm(searchTerm), 2000);
  }, [searchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchTerm]);

  const carouselImages = [
    "https://shifu.hotstarext.com/SOURCE/VOD/cd-2023-09-15/Kaala1920TNHPUpc3RTS_deskXbb-93594894-a165-4437-b793-2daeb63666a8.jpg",
    "https://shifu.hotstarext.com/SOURCE/VOD/cd-2023-09-21/TNHPLokiDPlus_deskXbb-379d9c3e-9d55-486c-a36f-1e5c4ff74d9f.jpg",
    " https://shifu.hotstarext.com/SOURCE/VOD/cd-2023-09-15/TNHPDated_deskXbb-a1f9214a-3ef6-49c2-bb81-a8b744eee621.jpg",
  ];

  console.log(movies, "data");

  const handleSortChange = (e) => {
   
    setSortBy(e.target.value);
  };
  
  if (sortBy === 'rating') {
    movies.sort((a, b) => b.imdbRating - a.imdbRating);
  } else if (sortBy === 'name') {
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.300", "gray.900")}  px={4} >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Image width="100px" src={logo}></Image>
             <Text fontSize="20px" fontWeight="bold">Mad Moviez</Text>
          </Box>


          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button background="none" onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={userLogo}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={userLogo}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* <MenuItem>Your Servers</MenuItem> */}
                  <Link to="/login" >
                    <MenuItem>Logout</MenuItem>
                  </Link>
                  <Link to="/login">
                 <MenuItem onClick={()=>{
                    localStorage.removeItem('user')
                  }}>Delete Account</MenuItem>
                  </Link>
                </MenuList>
                
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      {/* Carousel */}
      <Box width="100%" >
        <Slider
          speed={1700}
          autoplay={true}
          autoplaySpeed={1700}
          fade={true}
          arrows:false
          responsive={[
            {
              breakpoint: 768,
              settings: {
                arrows: false,
              },
            },
          ]}
        >
          {carouselImages.map((url, index) => (
            <Box maxW="100%" key={index} height={["200px", "300px", "450px"]}>
              <Image
                m="auto"
                maxH="100%"
                width="100%"
                src={url}
                alt={`carousel-${index}`}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      {/* Search Bar */}
      <Box py={4}>
        <Flex justify="center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies/series"
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              width: "300px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Flex>
        { movies.length>0 && <Box py={4}>
        <Flex justify="center">
          <select
            value={sortBy}
            onChange={handleSortChange}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              width: "150px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value=""> Select Sort</option>
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </Flex>
      </Box>}
      </Box>
    
    
      <br />


      {/* Movies Grid */}
      {isLoading ?(
       <Flex justify="center" align="center" h="200px">
       <CircularProgress isIndeterminate color="blue.300" />
     </Flex>
      ):(
        <Flex flexWrap="wrap" justify="center" align="center" gap="2rem">
        {movies.map((movie, index) => (
          <Box
            key={index}
            width="250px"
            m={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="base"
            onClick={() => setSelectedMovie(movie)}
            cursor="pointer"
          >
            <Image src={movie.Poster} alt={movie.Title} />
            <Box p="4">
              <Box d="flex" justifyContent="center" alignItems="center">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  display="flex"
                  justifyContent="space-between"
                >
                  {movie.Year}
                  <Badge
                    py="1"
                    fontSize="8px"
                    ml="auto"
                    variant="solid"
                    colorScheme="facebook"
                  >
                    {movie.Type}
                  </Badge>
                  <br />
                </Box>
              </Box>
              <Badge fontSize="10px" variant="outline" colorScheme="orange">
                {movie.imdbRating}/10
              </Badge>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {movie.Title}
              </Box>
              <Badge
                fontSize="10px"
                mt="2"
                variant="outline"
                colorScheme="whatsapp"
              >
                {movie.Genre}
              </Badge>
            </Box>
          </Box>
        ))}
      </Flex>
      )}

       {/* Movie details modal */}
       {selectedMovie && (
        <MovieModal
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          movie={selectedMovie}
        />
      )}

     
    </>
  );
};

export default Home;
