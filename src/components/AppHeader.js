import {
    ActionIcon,
    Header,
    Text,
    Group,
  } from '@mantine/core';
import { GitHub } from 'react-feather';

const AppHeader = () => {
    return(
        <Header height={60} p="md">
            <Group position="apart">
                <Text fw={600}>Distance Calculator</Text>
                <ActionIcon variant="default" component="a" href="https://github.com/mayaaio/distance-calculator">
                    <GitHub />
                </ActionIcon>
            </Group>
        </Header>
    )
}

export default AppHeader