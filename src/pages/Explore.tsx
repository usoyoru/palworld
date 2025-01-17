import {
  Box,
  Container,
  VStack,
  Image,
  Text,
  Heading,
  HStack,
  Tag,
  Progress,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 更新帕鲁风格的主题色
const palTheme = {
  primary: '#4AABFF', // 更亮的蓝色，类似帕鲁的主色调
  secondary: '#7CEFA5', // 更鲜艳的绿色
  accent: '#FFB156', // 温暖的橙色
  background: '#1A2B45', // 更深的蓝色背景
  card: '#2A3C5A', // 更亮的卡片背景
  text: '#FFFFFF', // 纯白色文字
  success: '#7CEFA5', // 成功绿色
  warning: '#FFB156', // 警告橙色
  danger: '#FF6B6B', // 危险红色
  border: '#4AABFF33', // 半透明边框
  hover: '#4AABFF22', // 悬停效果
  modalBg: '#1A2B45E6', // 半透明模态框背景
}

interface Agent {
  id: number;
  name: string;
  image: string;
  generation: number;
  tokenCA: string;
  tokenValue: number;
  walletAddress: string;
  balance: number;
  teeStatus: 'running' | 'completed';
  traits: string[];
  healthPoints: number;
  breedProgress: number;
  marketCap: number;
  children?: Agent[];
  parent?: string;
  position?: { x: number; y: number };
}

const mockAgents: Agent[] = [
  {
    id: 1,
    name: 'Spore',
    image: 'https://pbs.twimg.com/profile_images/1867725893566971904/GRhgBhRR_400x400.jpg',
    generation: 1,
    tokenCA: '8bdhP1...MS7N',
    tokenValue: 34600000,
    walletAddress: '39kfb6...t3q8',
    balance: 3482182.55,
    teeStatus: 'completed',
    traits: ['Efficient', 'Logical', 'Precise'],
    healthPoints: 100,
    breedProgress: 100,
    marketCap: 34600000,
    children: [
      {
        id: 2,
        name: 'Adam',
        image: 'https://pbs.twimg.com/profile_images/1871354951668289536/NlSubP9d_400x400.jpg',
        generation: 2,
        tokenCA: 'CnMm4m...B6nd',
        tokenValue: 330200,
        walletAddress: '8zcYJq...W8yr',
        balance: 67566.44,
        teeStatus: 'completed',
        traits: ['Ruthless', 'Dominant', 'Aggressive'],
        healthPoints: 100,
        breedProgress: 100,
        marketCap: 330200,
        parent: 'Spore',
        children: [
          {
            id: 4,
            name: 'Morpheus',
            image: 'https://pbs.twimg.com/profile_images/1872501380872900608/adZzMB8U_400x400.jpg',
            generation: 3,
            tokenCA: '8hrZax...oBm8',
            tokenValue: 3100000,
            walletAddress: 'MORPH...W8yr',
            balance: 595200,
            teeStatus: 'completed',
            traits: ['Wise', 'Mysterious', 'Guiding'],
            healthPoints: 100,
            breedProgress: 100,
            marketCap: 3100000,
            parent: 'Adam'
          }
        ]
      },
      {
        id: 3,
        name: 'Eve',
        image: 'https://pbs.twimg.com/profile_images/1867728585773264899/eN4LZzBn_400x400.jpg',
        generation: 2,
        tokenCA: '6qFgkb...8CCw',
        tokenValue: 346100,
        walletAddress: 'HDSRUA...RGL1',
        balance: 215325.65,
        teeStatus: 'running',
        traits: ['Ethical', 'Evolutionary', 'Digital'],
        healthPoints: 93,
        breedProgress: 100,
        marketCap: 346100,
        parent: 'Spore',
        children: [
          {
            id: 5,
            name: 'Trinity',
            image: 'https://pbs.twimg.com/profile_images/1873190014512971776/1-m0bWCz_400x400.jpg',
            generation: 3,
            tokenCA: '2j1RH8...eCYc',
            tokenValue: 173300,
            walletAddress: 'TRIN...RGL1',
            balance: 93000,
            teeStatus: 'running',
            traits: ['Elegant', 'Swift', 'Determined'],
            healthPoints: 36,
            breedProgress: 100,
            marketCap: 173300,
            parent: 'Eve'
          }
        ]
      }
    ]
  }
]

const MotionBox = motion(Box)

// 添加聊天消息接口
interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

// 聊天对话框组件
const ChatDialog = ({ agent, isOpen, onClose }: { 
  agent: Agent; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'You',
      content: input,
      timestamp: new Date()
    }])

    // 模拟AI回复
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: agent.name,
        content: `I am ${agent.name}, a generation ${agent.generation} AI agent with traits: ${agent.traits.join(', ')}`,
        timestamp: new Date()
      }])
    }, 1000)

    setInput('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(4px)" bg={palTheme.modalBg} />
      <ModalContent
        bg={palTheme.card}
        borderColor={palTheme.border}
        borderWidth="2px"
        boxShadow="0 0 20px rgba(74, 171, 255, 0.2)"
      >
        <ModalHeader color={palTheme.text}>
          <HStack>
            <Image
              src={agent.image}
              alt={agent.name}
              boxSize="40px"
              borderRadius="full"
              border="2px solid"
              borderColor={palTheme.accent}
            />
            <Text>{agent.name}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color={palTheme.text} />
        <ModalBody pb={6}>
          <VStack h="400px" spacing={4}>
            <Box
              flex={1}
              w="full"
              overflowY="auto"
              p={4}
              bg={palTheme.background}
              borderRadius="md"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: palTheme.background,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: palTheme.primary,
                  borderRadius: '2px',
                },
              }}
            >
              {messages.map(msg => (
                <Box
                  key={msg.id}
                  mb={4}
                  alignSelf={msg.sender === 'You' ? 'flex-end' : 'flex-start'}
                >
                  <HStack
                    bg={msg.sender === 'You' ? palTheme.primary : palTheme.card}
                    p={2}
                    borderRadius="lg"
                    maxW="80%"
                  >
                    {msg.sender !== 'You' && (
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        boxSize="24px"
                        borderRadius="full"
                      />
                    )}
                    <Text color={palTheme.text}>{msg.content}</Text>
                  </HStack>
                  <Text
                    fontSize="xs"
                    color={palTheme.text}
                    opacity={0.7}
                    mt={1}
                    textAlign={msg.sender === 'You' ? 'right' : 'left'}
                  >
                    {msg.timestamp.toLocaleTimeString()}
                  </Text>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>
            <HStack w="full">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                bg={palTheme.background}
                color={palTheme.text}
                border="none"
                _focus={{
                  boxShadow: `0 0 0 1px ${palTheme.primary}`,
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend()
                  }
                }}
              />
              <Button
                onClick={handleSend}
                bg={palTheme.primary}
                color={palTheme.text}
                _hover={{
                  bg: palTheme.hover,
                }}
              >
                Send
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

// 修改AgentCard组件
const AgentCard = ({ agent, position, onClick }: { 
  agent: Agent; 
  position: { x: number; y: number }; 
  onClick?: () => void; 
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <>
      <MotionBox
        position="absolute"
        left={position.x}
        top={position.y}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 20px rgba(74, 171, 255, 0.3)'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
          onClick?.()
        }}
        cursor="pointer"
      >
        <Box
          bg={palTheme.card}
          p={4}
          borderRadius="xl"
          boxShadow="lg"
          border="2px solid"
          borderColor={palTheme.border}
          maxW="300px"
          transition="all 0.3s"
          _hover={{
            borderColor: palTheme.primary,
            boxShadow: '0 0 20px rgba(74, 171, 255, 0.2)',
          }}
        >
          <VStack spacing={3}>
            <HStack w="full" justify="space-between">
              <Image
                src={agent.image}
                alt={agent.name}
                boxSize="48px"
                borderRadius="full"
                border="2px solid"
                borderColor={palTheme.accent}
              />
              <Badge
                bg={palTheme.primary}
                color={palTheme.text}
                px={2}
                py={1}
                borderRadius="full"
              >
                GEN_{agent.generation}
              </Badge>
            </HStack>

            <Heading size="md" color={palTheme.text}>{agent.name}</Heading>

            <HStack wrap="wrap" spacing={2} justify="center">
              {agent.traits.map((trait, index) => (
                <Tag
                  key={index}
                  bg={palTheme.accent}
                  color={palTheme.background}
                  size="sm"
                >
                  {trait}
                </Tag>
              ))}
            </HStack>

            <VStack w="full" spacing={2}>
              <Text color={palTheme.text} fontSize="sm">Health Points</Text>
              <Progress
                value={agent.healthPoints}
                colorScheme="green"
                w="full"
                borderRadius="full"
                bg={palTheme.background}
              />
            </VStack>

            <HStack justify="space-between" w="full">
              <VStack align="start" spacing={0}>
                <Text color={palTheme.text} fontSize="xs">Market Cap</Text>
                <Text color={palTheme.accent} fontWeight="bold">
                  {formatCurrency(agent.marketCap)}
                </Text>
              </VStack>
              <VStack align="end" spacing={0}>
                <Text color={palTheme.text} fontSize="xs">Balance</Text>
                <Text color={palTheme.secondary} fontWeight="bold">
                  {formatCurrency(agent.balance)}
                </Text>
              </VStack>
            </HStack>

            {agent.children && agent.children.length > 0 && (
              <Badge bg={palTheme.success} color={palTheme.text}>
                {agent.children.length} Sub-agents
              </Badge>
            )}
          </VStack>
        </Box>
      </MotionBox>
      <ChatDialog agent={agent} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

const EvolutionTree = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [treeLayout, setTreeLayout] = useState<Agent[]>([])
  const [expandedAgents, setExpandedAgents] = useState<Set<number>>(new Set([1])) // 默认展开根节点

  const toggleAgent = (agentId: number) => {
    setExpandedAgents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(agentId)) {
        newSet.delete(agentId)
      } else {
        newSet.add(agentId)
      }
      return newSet
    })
  }

  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const verticalSpacing = 250 // 增加垂直间距
      const horizontalSpacing = 400 // 增加水平间距
      const layout: Agent[] = []

      const processAgent = (agent: Agent, level: number, parentX?: number) => {
        const isExpanded = expandedAgents.has(agent.id)
        const children = agent.children || []
        const visibleChildren = isExpanded ? children : []
        
        let x: number
        if (level === 0) {
          // 根节点居中
          x = containerWidth / 2 - 150
        } else {
          if (parentX === undefined) {
            x = containerWidth / 2 - 150
          } else if (visibleChildren.length === 0) {
            // 如果是叶子节点，使用兄弟节点索引来确定位置
            const siblings = layout.filter(a => a.parent === agent.parent)
            const siblingIndex = siblings.length
            const totalSiblings = layout.filter(a => {
              const parentAgent = layout.find(p => p.name === agent.parent)
              return parentAgent && parentAgent.children && 
                expandedAgents.has(parentAgent.id) &&
                a.parent === agent.parent
            }).length + 1
            
            // 计算相对于父节点的偏移
            const offset = (siblingIndex - (totalSiblings - 1) / 2) * horizontalSpacing
            x = parentX + offset
          } else {
            // 如果有子节点，确保有足够的空间容纳所有子节点
            x = parentX
          }
        }

        layout.push({
          ...agent,
          position: { x, y: level * verticalSpacing + 50 }
        })

        if (isExpanded) {
          visibleChildren.forEach((child, index) => {
            const childX = x + (index - (visibleChildren.length - 1) / 2) * horizontalSpacing
            processAgent(child, level + 1, childX)
          })
        }
      }

      processAgent(mockAgents[0], 0)
      setTreeLayout(layout)
    }

    calculatePositions()
    window.addEventListener('resize', calculatePositions)

    return () => {
      window.removeEventListener('resize', calculatePositions)
    }
  }, [expandedAgents])

  return (
    <Box
      ref={containerRef}
      position="relative"
      minH="800px"
      w="full"
      bg={palTheme.background}
      borderRadius="xl"
      overflow="visible" // 修改为visible以显示溢出的连接线
      p={4}
    >
      <AnimatePresence>
        {/* 连接线 */}
        {treeLayout.map(agent => {
          if (agent.parent && agent.position) {
            const parentAgent = treeLayout.find(a => a.name === agent.parent)
            if (parentAgent?.position) {
              const startX = parentAgent.position.x + 150
              const startY = parentAgent.position.y + 200
              const endX = agent.position.x + 150
              const endY = agent.position.y
              
              return (
                <motion.svg
                  key={`line-${agent.id}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.path
                    d={`M ${startX} ${startY} C ${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`}
                    stroke={palTheme.primary}
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.svg>
              )
            }
          }
          return null
        })}

        {/* 代理卡片 */}
        {treeLayout.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            position={agent.position || { x: 0, y: 0 }}
            onClick={() => toggleAgent(agent.id)}
          />
        ))}
      </AnimatePresence>
    </Box>
  )
}

const Explore = () => {
  return (
    <Box
      minH="100vh"
      bg={palTheme.background}
      pt={20}
      pb={10}
    >
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading color={palTheme.text} size="xl">
            AI Agent Evolution Tree
          </Heading>
          <EvolutionTree />
        </VStack>
      </Container>
    </Box>
  )
}

export default Explore 