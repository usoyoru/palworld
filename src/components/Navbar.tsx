import { Box, Flex, Button, Heading, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="gray.800" px={4} position="fixed" w="full" zIndex={999}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Heading size="md" color="white">Spore</Heading>
        </RouterLink>

        <HStack gap={4}>
          <RouterLink to="/explore">
            <Button variant="ghost" color="white">
              Explore
            </Button>
          </RouterLink>
          <RouterLink to="/create">
            <Button colorScheme="purple">
              Create
            </Button>
          </RouterLink>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar 