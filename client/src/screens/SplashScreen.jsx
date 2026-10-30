import { useNavigate } from 'react-router-dom';
import Screen from '../components/layout/Screen.jsx';
import Logo from '../components/brand/Logo.jsx';
import Button from '../components/ui/Button.jsx';
import { ArrowLeft } from '../components/ui/icons.jsx';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <Screen>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-between overflow-y-auto px-6 pb-4 pt-6">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Logo />
          <p className="mt-8 max-w-[280px] text-center text-[12.5px] leading-7 text-muted">
            خلطات شامية أصيلة، وحلويات من قلب الدار. أهلاً بك في مانديلا.
          </p>
        </div>

        <Button size="lg" className="w-full animate-fade-up" onClick={() => navigate('/home')}>
          <span>اهلا وسهلا بكم</span>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </Screen>
  );
};

export default SplashScreen;
