import {
  Box,
  Container,
  VStack,
  HStack,
  Image,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  useToast,
  Tag,
  Progress,
} from '@chakra-ui/react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// 预设的帕鲁角色
const palCharacters = [
  {
    id: 1,
    name: 'Lamball',
    image: 'https://palworld.wiki.gg/images/thumb/a/a3/Lamball_menu.png/200px-Lamball_menu.png',
    type: 'Normal',
    workSuitability: ['Farming', 'Ranch'],
  },
  {
    id: 2,
    name: 'Foxparks',
    image: 'https://palworld.wiki.gg/images/thumb/8/89/Foxparks_menu.png/200px-Foxparks_menu.png',
    type: 'Fire',
    workSuitability: ['Kindling', 'Mining'],
  },
  {
    id: 3,
    name: 'Pengullet',
    image: 'https://palworld.wiki.gg/images/thumb/8/8d/Pengullet_menu.png/200px-Pengullet_menu.png',
    type: 'Ice/Water',
    workSuitability: ['Cooling', 'Watering'],
  },
  {
    id: 4,
    name: 'Cattiva',
    image: 'https://palworld.wiki.gg/images/thumb/8/88/Cattiva_menu.png/200px-Cattiva_menu.png',
    type: 'Neutral',
    workSuitability: ['Handiwork', 'Gathering'],
  },
  {
    id: 5,
    name: 'Chikipi',
    image: 'https://palworld.wiki.gg/images/thumb/f/f4/Chikipi_menu.png/200px-Chikipi_menu.png',
    type: 'Normal',
    workSuitability: ['Farming', 'Gathering'],
  },
]

// 可选的特性
const availableTraits = [
  'Diligent', 'Brave', 'Lucky', 'Energetic', 'Clever',
  'Friendly', 'Cautious', 'Strong', 'Swift', 'Resilient'
]

const palTheme = {
  primary: '#4AABFF',
  secondary: '#7CEFA5',
  accent: '#FFB156',
  background: '#1A2B45',
  card: '#2A3C5A',
  text: '#FFFFFF',
  success: '#7CEFA5',
  warning: '#FFB156',
  danger: '#FF6B6B',
  border: '#4AABFF33',
  hover: '#4AABFF22',
}

const Create = () => {
  const toast = useToast()
  const [selectedPal, setSelectedPal] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    traits: [] as string[],
    healthPoints: 100,
    workSuitability: [] as string[],
  })

  const handlePalSelect = (palId: number) => {
    setSelectedPal(palId)
    const pal = palCharacters.find(p => p.id === palId)
    if (pal) {
      setFormData(prev => ({
        ...prev,
        workSuitability: pal.workSuitability,
      }))
    }
  }

  const handleTraitToggle = (trait: string) => {
    setFormData(prev => {
      const traits = prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait].slice(0, 3)
      return { ...prev, traits }
    })
  }

  const handleSubmit = () => {
    if (!selectedPal) {
      toast({
        title: 'Please select a Pal',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (!formData.name) {
      toast({
        title: 'Please enter a name',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (formData.traits.length === 0) {
      toast({
        title: 'Please select at least one trait',
        status: 'error',
        duration: 3000,
      })
      return
    }

    // TODO: 调用创建Agent的API
    console.log('Creating agent:', {
      pal: palCharacters.find(p => p.id === selectedPal),
      ...formData,
    })

    toast({
      title: 'Agent created!',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Box minH="100vh" bg={palTheme.background} pt={20} pb={10}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading color={palTheme.text} size="xl">
            Create Your Pal Agent
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {/* 左侧：创建表单 */}
            <VStack
              spacing={6}
              align="stretch"
              bg={palTheme.card}
              p={6}
              borderRadius="xl"
              border="2px solid"
              borderColor={palTheme.border}
            >
              <Heading size="md" color={palTheme.text}>Select Your Pal</Heading>
              <SimpleGrid columns={2} spacing={4}>
                {palCharacters.map(pal => (
                  <MotionBox
                    key={pal.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    cursor="pointer"
                    bg={selectedPal === pal.id ? palTheme.hover : 'transparent'}
                    p={2}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor={selectedPal === pal.id ? palTheme.primary : 'transparent'}
                    onClick={() => handlePalSelect(pal.id)}
                  >
                    <VStack>
                      <Image
                        src={pal.image}
                        alt={pal.name}
                        boxSize="80px"
                        objectFit="contain"
                      />
                      <Text color={palTheme.text}>{pal.name}</Text>
                      <Tag size="sm" colorScheme="blue">{pal.type}</Tag>
                    </VStack>
                  </MotionBox>
                ))}
              </SimpleGrid>

              <FormControl>
                <FormLabel color={palTheme.text}>Agent Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter agent name"
                  bg={palTheme.background}
                  color={palTheme.text}
                  border="none"
                  _focus={{
                    boxShadow: `0 0 0 1px ${palTheme.primary}`,
                  }}
                />
              </FormControl>

              <Box>
                <FormLabel color={palTheme.text}>Select Traits (max 3)</FormLabel>
                <SimpleGrid columns={2} spacing={2}>
                  {availableTraits.map(trait => (
                    <Tag
                      key={trait}
                      size="lg"
                      variant={formData.traits.includes(trait) ? 'solid' : 'outline'}
                      colorScheme="orange"
                      cursor="pointer"
                      onClick={() => handleTraitToggle(trait)}
                    >
                      {trait}
                    </Tag>
                  ))}
                </SimpleGrid>
              </Box>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleSubmit}
                isDisabled={!selectedPal || !formData.name || formData.traits.length === 0}
              >
                Create Agent
              </Button>
            </VStack>

            {/* 右侧：预览 */}
            <VStack
              spacing={6}
              align="stretch"
              bg={palTheme.card}
              p={6}
              borderRadius="xl"
              border="2px solid"
              borderColor={palTheme.border}
            >
              <Heading size="md" color={palTheme.text}>Preview</Heading>
              {selectedPal ? (
                <VStack
                  spacing={4}
                  bg={palTheme.background}
                  p={6}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={palTheme.border}
                >
                  <Image
                    src={palCharacters.find(p => p.id === selectedPal)?.image}
                    alt="Selected Pal"
                    boxSize="200px"
                    objectFit="contain"
                  />
                  <Heading size="md" color={palTheme.text}>
                    {formData.name || 'Your Pal Name'}
                  </Heading>
                  <HStack wrap="wrap" justify="center">
                    {formData.traits.map(trait => (
                      <Tag
                        key={trait}
                        bg={palTheme.accent}
                        color={palTheme.background}
                      >
                        {trait}
                      </Tag>
                    ))}
                  </HStack>
                  <VStack w="full" spacing={2}>
                    <Text color={palTheme.text}>Health Points</Text>
                    <Progress
                      value={formData.healthPoints}
                      w="full"
                      colorScheme="green"
                      borderRadius="full"
                    />
                  </VStack>
                  <VStack align="start" w="full">
                    <Text color={palTheme.text}>Work Suitability:</Text>
                    <HStack wrap="wrap">
                      {formData.workSuitability.map(work => (
                        <Tag
                          key={work}
                          bg={palTheme.secondary}
                          color={palTheme.background}
                        >
                          {work}
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                </VStack>
              ) : (
                <Box
                  h="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color={palTheme.text} opacity={0.6}>
                    Select a Pal to see preview
                  </Text>
                </Box>
              )}
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Create 