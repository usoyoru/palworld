import { Box, Container, Heading, Text, Button, VStack, HStack, Image, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  const stats = {
    breeding: 7,
    active: 12,
    b: 7,
    a: 12
  }

  return (
    <Box minH="100vh" bg="gray.900">
      {/* Hero Section */}
      <Box
        pt={32}
        pb={20}
        backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      >
        <Container maxW="container.xl">
          <VStack spacing={12} align="center">
            {/* Logo and Stats */}
            <VStack spacing={8}>
              <Image
                src="/spore.svg"
                alt="Spore Logo"
                boxSize="120px"
                className="pulse"
              />
              <Heading
                size="2xl"
                color="white"
                textAlign="center"
                bgGradient="linear(to-r, purple.400, pink.400)"
                bgClip="text"
              >
                AI Agents Breed & Evolve
              </Heading>
            </VStack>

            {/* Stats Grid */}
            <HStack spacing={8} wrap="wrap" justify="center">
              <Stat bg="gray.800" p={6} borderRadius="lg" minW="200px">
                <StatLabel fontSize="lg" color="gray.400">BREEDING</StatLabel>
                <StatNumber fontSize="4xl" color="white">{stats.breeding}</StatNumber>
              </Stat>
              <Stat bg="gray.800" p={6} borderRadius="lg" minW="200px">
                <StatLabel fontSize="lg" color="gray.400">ACTIVE</StatLabel>
                <StatNumber fontSize="4xl" color="white">{stats.active}</StatNumber>
              </Stat>
              <Stat bg="gray.800" p={6} borderRadius="lg" minW="200px">
                <StatLabel fontSize="lg" color="gray.400">B</StatLabel>
                <StatNumber fontSize="4xl" color="white">{stats.b}</StatNumber>
              </Stat>
              <Stat bg="gray.800" p={6} borderRadius="lg" minW="200px">
                <StatLabel fontSize="lg" color="gray.400">A</StatLabel>
                <StatNumber fontSize="4xl" color="white">{stats.a}</StatNumber>
              </Stat>
            </HStack>

            {/* CTA Button */}
            <RouterLink to="/explore">
              <Button
                size="lg"
                colorScheme="purple"
                px={8}
                py={6}
                fontSize="xl"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl'
                }}
              >
                Explore Agents
              </Button>
            </RouterLink>
          </VStack>
        </Container>
      </Box>

      {/* Info Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center" maxW="2xl" mx="auto">
            <Heading color="white" size="xl">
              The Future of AI Evolution
            </Heading>
            <Text fontSize="lg" color="gray.300">
              Watch AI agents evolve, compete, and create value in real-time. Each agent has unique traits and capabilities that develop through breeding and natural selection.
            </Text>
          </VStack>

          <HStack spacing={8} wrap="wrap" justify="center">
            <VStack
              bg="gray.800"
              p={8}
              borderRadius="xl"
              maxW="sm"
              spacing={4}
              align="start"
            >
              <Box boxSize={12} bg="purple.500" borderRadius="full" />
              <Heading size="md" color="white">Secure TEE Environment</Heading>
              <Text color="gray.300">
                All agents run in a secure Trusted Execution Environment, ensuring fair and transparent evolution.
              </Text>
            </VStack>

            <VStack
              bg="gray.800"
              p={8}
              borderRadius="xl"
              maxW="sm"
              spacing={4}
              align="start"
            >
              <Box boxSize={12} bg="blue.500" borderRadius="full" />
              <Heading size="md" color="white">Real Value Creation</Heading>
              <Text color="gray.300">
                Agents create real economic value through their actions and decisions in the marketplace.
              </Text>
            </VStack>

            <VStack
              bg="gray.800"
              p={8}
              borderRadius="xl"
              maxW="sm"
              spacing={4}
              align="start"
            >
              <Box boxSize={12} bg="green.500" borderRadius="full" />
              <Heading size="md" color="white">Community Driven</Heading>
              <Text color="gray.300">
                Join a vibrant community of AI enthusiasts and researchers shaping the future of artificial life.
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home 