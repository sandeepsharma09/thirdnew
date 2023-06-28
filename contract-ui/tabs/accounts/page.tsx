import { AccountsTable } from "./components/accounts-table";
import { CreateAccountButton } from "./components/create-account-button";
import { Box, ButtonGroup, Flex } from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useSmartWallets,
  useSmartWalletsForAddress,
} from "@thirdweb-dev/react";
import { Card, Heading, LinkButton, Text } from "tw-components";

interface AccountsPageProps {
  contractAddress?: string;
}

export const AccountsPage: React.FC<AccountsPageProps> = ({
  contractAddress,
}) => {
  const contractQuery = useContract(contractAddress);
  const accountsQuery = useSmartWallets(contractQuery?.contract);
  const address = useAddress();

  const { data: smartWalletsForAddress } = useSmartWalletsForAddress(
    contractQuery.contract,
    address,
  );

  if (contractQuery.isLoading) {
    return null;
  }

  if (!contractQuery?.contract) {
    return (
      <Card as={Flex} flexDir="column" gap={3}>
        {/* TODO  extract this out into it's own component and make it better */}
        <Heading size="subtitle.md">No Accounts extension enabled</Heading>
        <Text>
          To enable Accounts factory features you will have to extend an
          interface on your contract.
        </Text>
        <Box>
          <LinkButton
            isExternal
            href="https://portal.thirdweb.com/solidity/extensions/base-account-factory"
            colorScheme="purple"
          >
            Learn more
          </LinkButton>
        </Box>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Accounts</Heading>
        <ButtonGroup
          flexDirection={{ base: "column", md: "row" }}
          gap={2}
          w="inherit"
        >
          <CreateAccountButton contractQuery={contractQuery} />
        </ButtonGroup>
      </Flex>
      <AccountsTable
        accountsQuery={accountsQuery}
        smartWalletsForAddress={smartWalletsForAddress}
      />
    </Flex>
  );
};
