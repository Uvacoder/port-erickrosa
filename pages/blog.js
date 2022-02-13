import NextLink from "next/link";
import Container from "../components/Container";
import {
  Heading, Box,
  Stack,
  Link,
  Text,
  UnorderedList,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  ListItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getAllPosts } from "./api/notion";
import { useState } from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import  BlogPost  from "../components/BlogPosts"


export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

function Blog({ posts }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredBlogPosts = posts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter(
      (frontMatter) =>
        frontMatter.title?.toLowerCase()?.includes(searchValue.toLowerCase()) ||
        frontMatter.description
          ?.toLowerCase()
          ?.includes(searchValue.toLowerCase())
    );

  if (!posts)
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  return (
    <>
     <NextSeo
        title="Blog - Erick Rosa"
        description="Erick Rosa's Blog page"
        canonical="https://erickrosa.dev"
        openGraph={{

        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 0 auto"
          maxWidth="1000px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="1000px"
            px={4}
            minH="100vh"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Heading letterSpacing="tight" as="h1" size="2xl" my={4}>
                Blog
              </Heading>
              <Text mb={5 }>Blog posts</Text>
              <InputGroup mb={4} mr={4} w="100%">
                <Input
                  aria-label="Search by post title or summary"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search by post title or summary"
                />
                <InputRightElement>
                  <SearchIcon color="gray.300" />
                </InputRightElement>
              </InputGroup>
              {!filteredBlogPosts.length && "No posts found."}
              {filteredBlogPosts.map((frontMatter, index) => (
          
                    <BlogPost>
          
           <Box> <Flex  flexDir={"column"}>
                <Link
                  key={frontMatter.title}
                  href={frontMatter.slug}
                  {...frontMatter}
                >
                  {frontMatter.title}
                      </Link>
           
                

                <Link
                  key={frontMatter.description}
                  href={frontMatter.slug}
                  {...frontMatter}
                >
                  {frontMatter.description}
                    </Link>
                    </Flex>
              </Box>
                  </BlogPost>
                 

              ))}
            </motion.div>
          </Flex>
        </Stack>

        <Heading as="h2" m="0 auto;">
          Posts
        </Heading>
        <Flex>
          <UnorderedList>
            {posts.map((post) => (
              <ListItem>
                <NextLink href="/[slug]" as={`/${post.slug}`} passHref>
                  <Link textDecoration="none">
                    <div>{post.title}</div>
                    <div>
                      {post.description} - {post.date}
                    </div>
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      </Container>
    </>
  );
}

export default Blog;
