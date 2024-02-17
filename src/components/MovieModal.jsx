import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Badge,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

const MovieModal = ({ isOpen, onClose, movie }) => {
  return (
    <Modal size={{ base: "lg", md: "2xl" }} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalOverlay />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title: {movie.Title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" gap="1rem">
          <Image
           
            src={movie.Poster}
            alt={movie.Title}
            mb="1rem"
            height={{base:"25%", md:"100%"}}
            maxW={{base:"60%", md:"100%"}}
            
          />
          <Box>
        
          <Box width="55%" display="flex" flexDirection="column" gap="10px">
         
          <Badge fontSize="sm" variant="solid" colorScheme="whatsapp">
          Year: {movie.Year}
          </Badge>
       
          <Badge fontSize="sm" variant="solid" colorScheme="red">
          Rated: {movie.Rated}
          </Badge>
      
          <Badge   fontSize="sm" variant="solid" colorScheme="gray">
          Released: {movie.Released}
          </Badge>
          
          <Badge fontSize="sm" variant="solid" colorScheme="orange">
            IMDb Rating: {movie.imdbRating}/10
          </Badge>
             
          </Box>
          
          <Text fontStyle="italic" mt="1rem"  fontSize="lg" fontWeight="medium" color="gray.500">{movie.Plot}</Text>
           <Button mt="1rem" colorScheme="linkedin">
            Watch Now ▶
           </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
