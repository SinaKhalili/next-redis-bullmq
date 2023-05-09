import Head from "next/head";
import {
  Box,
  Text,
  Flex,
  Heading,
  Stack,
  Button,
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IJobData {
  id: string;
  status: string;
  data: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<IJobData[]>([]);

  const handleAddJob = async () => {
    const res = await fetch("/api/add-job");
    await handleRefreshJobs();
  };

  const handleRefreshJobs = async () => {
    const res = await fetch("/api/get-jobs");
    const data = await res.json();
    setJobs(data.jobs);
  };

  const colorForStatus = (status: string) => {
    switch (status) {
      case "waiting":
        return "yellow";
      case "completed":
        return "green";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    const checkAllJobsCompleted = () => {
      if (jobs.every((job) => job.status === "completed")) {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(() => {
      handleRefreshJobs();
      checkAllJobsCompleted();
    }, 5000);

    checkAllJobsCompleted();

    return () => clearInterval(intervalId);
  }, [jobs]);

  return (
    <>
      <Head>
        <title>Worlds coolest website</title>
        <meta name="description" content="A great website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        align="center"
        fontSize="21px"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        fontWeight="extrabold"
        flexDirection="column"
        minH="100vh"
      >
        <Text m={6} color="white">
          Wow this website really slaps!!
        </Text>
        {jobs.length >= 1 && (
          <Table w="fit-content" m={6} fontSize="15px">
            <Thead>
              <Tr>
                <Th>
                  <Text color="white">Job ID</Text>
                </Th>
                <Th>
                  <Text color="white">Status</Text>
                </Th>
                <Th>
                  <Text color="white">Data</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.map((job: any) => (
                <Tr key={job.id}>
                  <Td>
                    <Text color="white">{job.id}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={colorForStatus(job.status)}>
                      {job.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Text color="white">{job.data}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Stack spacing={8} direction="row">
          <Button colorScheme="facebook" onClick={handleAddJob}>
            Add job
          </Button>
          <Button colorScheme="green" onClick={handleRefreshJobs}>
            Refresh jobs
          </Button>
          <Button colorScheme="red">Kill job</Button>
        </Stack>
      </Flex>
    </>
  );
}
