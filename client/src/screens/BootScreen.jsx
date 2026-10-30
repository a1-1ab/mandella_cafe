import Screen from '../components/layout/Screen.jsx';
import Logo from '../components/brand/Logo.jsx';

const BootScreen = () => (
  <Screen indicator={false}>
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <Logo />
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-teal/30 border-t-teal" />
    </div>
  </Screen>
);

export default BootScreen;
