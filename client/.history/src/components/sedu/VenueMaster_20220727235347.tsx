import React from 'react'
import { Group, Button, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
function VenueMaster() {

    const [count, handlers] = useCounter(0, { min: 0, max: 10 });

    return (
        <div className='sub-body-content'>
            <h1 className='sub-body-title'>Venue Details</h1>
            <Text>Count: {count}</Text>
            <Group position="center">
                <Button onClick={handlers.increment}>Increment</Button>
                <Button onClick={handlers.decrement}>Decrement</Button>
                <Button onClick={handlers.reset}>Reset</Button>
                <Button onClick={() => handlers.set(5)}>Set 5</Button>
            </Group>
        </div>
    )
}

export default VenueMaster