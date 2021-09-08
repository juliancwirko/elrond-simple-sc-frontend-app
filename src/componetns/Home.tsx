import MainLayout from './MainLayout';
import { useHistory } from 'react-router-dom';
import { Pane, Button, Paragraph, Link, Text } from 'evergreen-ui';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <Pane backgroundColor='white' elevation={1} padding={30}>
        <Pane>
          <Paragraph marginBottom={15}>
            PiggyBank is an app for a custom Smart Contract on the Elrond
            blockchain. Check{' '}
            <Link href='https://github.com/juliancwirko/elrond-simple-sc-frontend-app'>
              GitHub
            </Link>{' '}
            repo.
          </Paragraph>
          <Paragraph marginBottom={15}>
            <Text fontWeight='bold'>Logic:</Text> When you create a Piggy, you
            need to provide lock time data in the future. Then you can add some
            xEGLD amount to be locked till the lock date. For simplicity in the
            frontend app, all data is saved in the local storage, but you can
            always sync it with the Smart Contract. For now, after the payout,
            you would need to create another Piggy.
          </Paragraph>
          <Paragraph marginBottom={15}>
            If you want to know more about preparing and deploying such a Smart
            Contract, check out the separate{' '}
            <Link href='https://www.julian.io/articles/elrond-smart-contracts.html'>
              blog post.
            </Link>
            . And{' '}
            <Link href='https://github.com/juliancwirko/elrond-simple-sc'>
              repository
            </Link>
            . Walkthrough video there, and the article talks about the testnet
            because I used the testnet back then. But you can quickly do the
            same using the devnet, which I recommend. You'll find information on
            how to do this also there.
          </Paragraph>
          <Paragraph marginBottom={15}>
            This app is for learning and demonstration purposes only. It can be
            buggy.
          </Paragraph>
          <Paragraph marginBottom={15}>
            You can log in using your devnet wallet. Then you would also need
            some xEGLD. For the devnet you can get some using the faucet from
            the devnet web wallet. Or there is also one{' '}
            <Link href='https://r3d4.fr/elrond/devnet/'>here</Link>.
          </Paragraph>
          <Paragraph marginBottom={15}>
            Check the GitHub{' '}
            <Link href='https://github.com/juliancwirko/elrond-simple-sc-frontend-app'>
              README.md
            </Link>{' '}
            file if you want to play with it locally, with your own PiggyBank
            Smart Contract, etc.
          </Paragraph>
          <Paragraph>
            Generated using{' '}
            <Link href='https://www.npmjs.com/package/cra-template-elrond-dapp'>
              CRA elrond-dapp template
            </Link>{' '}
            and Elrond tools
          </Paragraph>
        </Pane>
      </Pane>
      <Pane
        marginTop={30}
        textAlign='center'
        backgroundColor='white'
        elevation={1}
        padding={30}
      >
        <Button
          onClick={() => history.push('/unlock')}
          appearance='primary'
          size='large'
        >
          Unlock
        </Button>
      </Pane>
    </MainLayout>
  );
};

export default Home;
