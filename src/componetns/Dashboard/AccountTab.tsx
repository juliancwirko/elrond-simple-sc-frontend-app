import { Ui } from '@elrondnetwork/dapp-utils';
import { Pane, Heading, Paragraph, Link, Text, LinkIcon } from 'evergreen-ui';
import { useMediaQuery } from 'react-responsive';
import * as Dapp from '@elrondnetwork/dapp';

const AccountTab = () => {
  const { account, address, explorerAddress } = Dapp.useContext();
  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

  return (
    <>
      <Pane display='flex' flexDirection={smallRes ? 'column' : 'row'}>
        <Pane
          width={smallRes ? '100%' : '50%'}
          marginRight={smallRes ? 0 : 10}
          marginBottom={25}
          padding={30}
          elevation={1}
          backgroundColor='white'
        >
          <Heading size={700} marginBottom={10}>
            Your wallet address:
          </Heading>
          <Paragraph>
            <Link
              display='flex'
              alignItems='center'
              href={`${explorerAddress}accounts/${address}`}
              wordBreak='break-word'
              target='_blank'
              rel='noreferrer'
            >
              <Text wordWrap='break-word'>{address}</Text>{' '}
              <LinkIcon marginLeft={10} />
            </Link>
          </Paragraph>
        </Pane>

        <Pane
          width={smallRes ? '100%' : '50%'}
          marginLeft={smallRes ? 0 : 10}
          marginBottom={25}
          padding={30}
          elevation={1}
          backgroundColor='white'
        >
          <Heading size={700} marginBottom={10}>
            Your wallet balance:
          </Heading>
          <Paragraph>
            <Ui.Denominate value={account.balance} erdLabel='xEGLD' />
          </Paragraph>
        </Pane>
      </Pane>
    </>
  );
};

export default AccountTab;
