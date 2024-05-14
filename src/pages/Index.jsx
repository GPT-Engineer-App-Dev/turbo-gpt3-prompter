import { useState } from 'react';
import { Box, Button, Container, Input, Textarea, VStack, Text } from '@chakra-ui/react';
import { create } from 'lib/openai';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    const res = await create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    });
    if (res && res.choices && res.choices.length > 0) {
      setResponse(res.choices[0].message.content);
    } else {
      setResponse('No response from the AI.');
    }
    setIsLoading(false);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Ask GPT-3.5 Turbo</Text>
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handleInputChange}
          size="lg"
        />
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          onClick={handleSubmit}
          disabled={!prompt.trim()}
        >
          Submit
        </Button>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Text fontSize="md">{response || "Your AI response will appear here..."}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;