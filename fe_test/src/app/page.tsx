'use client'
import AdminLayout from '@/components/templates/AdminLayout'
import {
  Text,
  Box,
  Grid,
  Card,
  CardBody,
  Heading,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FiMenu, FiLayers } from 'react-icons/fi'

const menuItems = [
  {
    title: 'Menu Management',
    description: 'Kelola dan atur menu aplikasi Anda',
    path: '/menu-management',
    icon: FiMenu,
    color: 'blue.500',
    bgColor: 'blue.50',
  },
  {
    title: 'Menu Group',
    description: 'Organisasi menu berdasarkan grup kategori',
    path: '/menu-group',
    icon: FiLayers,
    color: 'green.500',
    bgColor: 'green.50',
  },
]

export default function RootPage() {
  const router = useRouter()
  const [menuGroup, setMenuGroup] = React.useState([])
  const [menuManagement, setMenuManagement] = React.useState([])

  useEffect(() => {
    const menuGroupData =
      (localStorage &&
        JSON.parse(localStorage.getItem('menu_group') ?? '[]')) ||
      []
    const menuManagementData =
      (localStorage && JSON.parse(localStorage.getItem('menu') ?? '[]')) || []

    setMenuGroup(menuGroupData)
    setMenuManagement(menuManagementData)
  }, [])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <AdminLayout>
      <div className="!p-5">
        <h1 className="!text-2xl !font-bold mb-2 !text-black">Dashboard</h1>
        <Text color={'black'} mb={6}>
          Welcome to the dashboard page of your admin panel. You can use this
          page to manage your website&apos;s content and settings.
        </Text>

        <Box>
          <Heading size="md" color="black" mb={4}>
            Menu Navigasi
          </Heading>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={4}
          >
            {menuItems.map((item, index) => (
              <Card.Root
                key={index}
                cursor="pointer"
                onClick={() => handleNavigate(item.path)}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                  transition: 'all 0.2s ease-in-out',
                }}
                transition="all 0.2s ease-in-out"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <CardBody>
                  <Flex direction="column" align="start" gap={3}>
                    <Flex
                      w={12}
                      h={12}
                      bg={item.bgColor}
                      borderRadius="lg"
                      align="center"
                      justify="center"
                    >
                      <Icon as={item.icon} w={6} h={6} color={item.color} />
                    </Flex>

                    <Box>
                      <Heading size="sm" color="black" mb={2}>
                        {item.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        {item.description}
                      </Text>
                    </Box>
                  </Flex>
                </CardBody>
              </Card.Root>
            ))}
          </Grid>
        </Box>

        <Box mt={8}>
          <Heading size="md" color="black" mb={4}>
            Informasi Sistem
          </Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            <Card.Root borderWidth="1px" borderColor="gray.200">
              <CardBody textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {menuGroup.length}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Total Menu Management
                </Text>
              </CardBody>
            </Card.Root>

            <Card.Root borderWidth="1px" borderColor="gray.200">
              <CardBody textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {menuManagement.length}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Total Menu Management
                </Text>
              </CardBody>
            </Card.Root>
          </Grid>
        </Box>
      </div>
    </AdminLayout>
  )
}
