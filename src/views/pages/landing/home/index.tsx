import { Box, Grid2 as Grid, Container, useTheme, Button, Typography, keyframes, styled } from '@mui/material';
import { Description, Analytics, VerifiedUser } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaMin, useMediaMax } from '@hooks/useMediaQuery';
import { useCartState } from '@state/cart.state';
import useSession from '@hooks/useSession';
import pageRoutes from '@constant/page-routes';

import LogoPath from '@assets/images/logo.svg';
import privacyAndCookiePolicy from '@assets/files/GizlilikVeCerezPolitikasi.pdf';
import personalDataProtectionAuthorityPolicy from '@assets/files/KvkkPolitikasi.pdf';
import personalDataProtectionAuthorityRetentionAndDisposalPolicy from '@assets/files/KvkkSaklamaVeImhaPolitikasi.pdf';
import userAgreementPolicy from '@assets/files/KullaniciSozlesmesi.pdf';

const terms = [
  {
    title: 'Kullanıcı Sözleşmesi',
    link: userAgreementPolicy,
  },
  {
    title: 'Gizlilik ve Çerez Politikası',
    link: privacyAndCookiePolicy,
  },
  {
    title: 'KVKK Politikası',
    link: personalDataProtectionAuthorityPolicy,
  },
  {
    title: 'KVKK Saklama ve İmha Politikası',
    link: personalDataProtectionAuthorityRetentionAndDisposalPolicy,
  }
]

const features = [
  {
    icon: <Description fontSize={'large'} color={'info'} />,
    title: 'Otomatik Fatura Oluşturma',
    description:
      'Faturalama süreçlerinizi tamamen otomatik hale getirin. Manuel müdahaleye gerek kalmadan, işlerinizi kolaylaştırın ve zamandan tasarruf edin.'
  },
  {
    icon: <Analytics fontSize={'large'} color={'info'} />,
    title: 'Gelişmiş Analiz ve Raporlama',
    description:
      'İşletmenizin performansını kapsamlı ve özelleştirilebilir raporlarla detaylandırın. Stratejik kararlar almanıza yardımcı olacak derinlemesine analizlere erişin.'
  },
  {
    icon: <VerifiedUser fontSize={'large'} color={'info'} />,
    title: 'Üst Düzey Veri Güvenliği',
    description:
      'Verilerinizi en yüksek güvenlik standartlarıyla koruyun. Güvenliğinizden ödün vermeden, veri bütünlüğünü ve gizliliğini sağlayın.'
  }
];

function LogoImage() {
  return <Box
    component={'img'}
    src={LogoPath}
    alt="Invosan"
    width={60}
    height={60}
    sx={{
      objectFit: 'contain'
    }}
  />;
}

const moveForever = keyframes`
  0% { transform: translate(-2px, 0); }
  100% { transform: translate(0px, 0); }
`;

const AnimatedWave = styled("svg")(() => ({
  width: "100vw",
  height: "100vh",
  "& use": {
    animation: `${moveForever} 2s linear infinite`,
    "&:nth-of-type(2)": {
      animationDuration: "2.5s",
      animationDelay: "-1.5s",
    },
    "&:nth-of-type(1)": {
      animationDuration: "5s",
    },
  },
}));

function AnimatedBackground() {
  return (
    <Box
      sx={{
        margin: 0,
        overflow: "hidden",
      }}
    >
      <AnimatedWave viewBox="0 0 2 1" preserveAspectRatio="none">
        <defs>
          <path
            id="w"
            d="
              m0 1v-.5
              q.5.5 1 0
              t1 0 1 0 1 0
              v.5z"
          />
        </defs>
        <g>
          <use href="#w" y="0.0" fill="#2d55aa" />
          <use href="#w" y="0.1" fill="#3461c1" />
          <use href="#w" y="0.2" fill="#4579e2" />
        </g>
      </AnimatedWave>
    </Box>
  );
}

function Header () {
  const session = useSession();
  const theme = useTheme();

  return (
    <Box component={'header'} sx={{ background: theme.palette.primary.dark, }}>
      <Container maxWidth={'lg'}>
        <Grid container alignItems={'center'}>
          <Grid size={{ xs: 12, lg: 2 }}>
            <Button
              variant={'text'}
              to={'/'}
              component={Link}
              startIcon={<LogoImage />}
              sx={{
                fontWeight: 'bold',
                lineHeight: 1,
              }}
            >
              <Typography
                component={'span'}
                sx={{
                  display: 'block',
                  color: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark});`,
                  fontWeight: 700,
                  textShadow: `-1px 1px 0 ${theme.palette.primary.main}, 1px 1px 0 ${theme.palette.primary.dark}, 1px -1px 0 ${theme.palette.primary.dark},  -1px -1px 0 ${theme.palette.primary.dark}`,
                }}>
                {'Invosan'}
              </Typography>
            </Button>
          </Grid>
          <Grid size={{ xs: 12, lg: 10 }}>
            <Grid container alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
              {session ? (
                <Grid>
                  <Button variant={'contained'} color={'primary'} component={Link} to={pageRoutes.dashboard}>{'Invosan Panel'}</Button>
                </Grid>
                ) : (
                <>
                  <Grid>
                    <Button variant={'contained'} color={'primary'} component={Link} to={pageRoutes.auth.register}>{'Kayıt Ol'}</Button>
                  </Grid>
                  <Grid>
                    <Button variant={'contained'} color={'secondary'} component={Link} to={pageRoutes.auth.login}>{'Giriş Yap'}</Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component={'footer'}
      sx={{
        background: theme.palette.common.black,
        paddingY: 2,
        color: theme.palette.common.white
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid container>
          <Grid size={{ md: 4 }}>
            <Typography
              sx={{
                textAlign: 'center',
                mb: 2,
                fontWeight: 600
              }}
            >
              {'Hakkımızda'}
            </Typography>
            <Typography>
              {
                'Invosan, muhasebe süreçlerini kolaylaştıran bir platformdur. Güçlü özelliklerimizle işlerinizi daha verimli hale getiriyoruz.'
              }
            </Typography>
          </Grid>
          <Grid size={{ md: 4 }}>
            <Typography
              sx={{
                textAlign: 'center',
                mb: 2,
                fontWeight: 600
              }}
            >
              {'Yasal Bilgiler'}
            </Typography>
            {terms.map((term, index) => (
              <Button target={'_blank'} rel={'noreferrer'} href={term.link} fullWidth key={index} component={'a'} sx={{
                color: theme.palette.common.white,
              }}>
                {term.title}
              </Button>
            ))}
          </Grid>
          <Grid size={{ md: 4 }}>
            <Typography
              sx={{
                textAlign: 'center',
                mb: 2,
                fontWeight: 600
              }}
            >
              {'İletişim'}
            </Typography>
            <Typography>{'Aksu Mah. Yurt Sk. OMÜ Yerleşkesi, Samsun Teknopark No: 165 Atakum/Samsun'}</Typography>
            <Typography>{'E-posta: info@invosan.com'}</Typography>
          </Grid>
        </Grid>
        <Typography
          sx={{
            mt: 3,
            pt: 2,
            textAlign: 'center',
            borderTop: `1px solid ${theme.palette.grey['700']}`,
            color: theme.palette.grey['500']
          }}
        >
          {'@2024 Invosan. Tüm hakları saklıdır.'}
        </Typography>
      </Container>
    </Box>
  );
}

function Hero() {
  const theme = useTheme();
  const session = useSession();
  const minLg = useMediaMin('lg');
  const maxLg = useMediaMax('lg');

  return (
    <Box sx={{ background: theme.palette.primary.dark, position: 'relative' }}>
      <AnimatedBackground />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <Container maxWidth={'lg'}>
          <Grid
            container
            alignItems={'center'}
            sx={{ minHeight: '100vh', height: '100%' }}
          >
            <Grid size={{ xs: 12, md: 9 }} sx={{
              [maxLg]: {
                textAlign: 'center',
              },
              [minLg]: {
                textAlign: 'left',
              },
            }}>
              <Typography
                component={'h1'}
                sx={{
                  fontWeight: 700,
                  [maxLg]: {
                    fontSize: 24,
                  },
                  [minLg]: {
                    fontSize: 60,
                  },
                  lineHeight: 1.2,
                  color: theme.palette.primary.contrastText
                }}
              >
                {'Muhasebe Otomasyonunu'}
                <Typography
                  sx={{
                    [maxLg]: {
                      fontSize: 24,
                    },
                    [minLg]: {
                      fontSize: 60,
                    },
                    fontWeight: 700,
                    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main});`,
                    color: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {'Yeniden Keşfedin'}
                </Typography>
              </Typography>
              <Typography
                component={'p'}
                sx={{
                  [maxLg]: {
                    fontSize: 14,
                  },
                  [minLg]: {
                    fontSize: 20,
                  },
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: theme.palette.primary.contrastText,
                  marginTop: 3,
                }}
              >
                {'Invosan ile muhasebe işlemlerinizi kolaylaştırın ve zamandan tasarruf edin.'}
              </Typography>
              <Button
                to={session ? pageRoutes.dashboard : pageRoutes.auth.register}
                component={Link}
                variant={'contained'}
                color={'primary'}
                size={minLg ? 'large' : 'small'}
                sx={{ fontWeight: 700, mt: 2 }}
              >
                {session ? 'Keşfetmeye Devam Et' : 'Şimdi Dene'}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

function Features() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingY: 10,
        minHeight: '100vh',
        background: theme.palette.grey['900'],
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <Container maxWidth={'lg'}>
        <Box
          sx={{
            color: theme.palette.common.white,
            background: theme.palette.grey['800'],
            borderRadius: 10,
            padding: 4
          }}
        >
          <Typography
            component={'h2'}
            sx={{
              textAlign: 'center',
              fontSize: 32,
              fontWeight: 500,
              mb: 2,
            }}
          >
            {'Öne Çıkan Özellikler'}
          </Typography>

          <Grid container spacing={2} padding={2}>
            {features.map((feature, index) => (
              <Grid key={index} size={{ md: 4 }}>
                <Box
                  sx={{
                    paddingY: 2,
                    paddingX: 3,
                    borderRadius: 5,
                    background: theme.palette.grey.A700,
                    textAlign: 'center',
                    height: '100%'
                  }}
                >
                  {feature.icon}
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 15,
                      lineHeight: 1.7
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

type Package = {
  name: string;
  price: number;
  credit: number;
  unitPrice: string;
}

function Pricing() {
  const theme = useTheme();
  const navigate = useNavigate();
  const selectPackage = useCartState((state) => state.selectPackage);

  const packages: Package[] = [
    { name: 'HOŞGELDİN', credit: 2500, price: 1650, unitPrice: '0,66 KRŞ' },
    { name: 'STANDART', credit: 5000, price: 3000, unitPrice: '0,60 KRŞ' },
    { name: 'EKONOMİK', credit: 10000, price: 5300, unitPrice: '0,53 KRŞ' },
    { name: 'KURUMSAL', credit: 25000, price: 11500, unitPrice: '0,46 KRŞ' },
    { name: 'GOLD', credit: 50000, price: 20000, unitPrice: '0,40 KRŞ' },
    { name: 'PLATİNYUM', credit: 100000, price: 33000, unitPrice: '0,33 KRŞ' },
  ];

  const handleSelectPackage = (selectedPackage: Package) => {
    selectPackage({
      name: selectedPackage.name,
      price: selectedPackage.price,
      credit: selectedPackage.credit,
    })

    navigate(pageRoutes.checkout);
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(5, 0)
      }}
    >
      <Container>
        <Typography
          component={'h2'}
          sx={{
            fontSize: 45,
            fontWeight: 600,
            mb: 4
          }}
        >
          {'Fiyatlandırma Planları'}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid size={{ sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  borderRadius: 3,
                  padding: 4,
                  background: theme.palette.grey.A700,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {pkg.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 36,
                    fontWeight: 600,
                    color: theme.palette.primary.light,
                    mb: 1
                  }}
                >
                  {new Intl.NumberFormat('tr-TR', { style: 'decimal'}).format(pkg.credit)} {'KONTÖR'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 3
                  }}
                >
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(pkg.price)}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 1 }}>
                  {pkg.unitPrice}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 1 }}>
                  {'BANKA 1 KONTÖR'}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 1 }}>
                  {'FATURA 3 KONTÖR'}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 1 }}>
                  {'İHRACAT FATURASI 10 KONTÖR'}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 1 }}>
                  {'HAL KOMİSYONCU 10 KONTÖR'}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 1 }}>
                  {'MÜSTAHSİL MAKBUZU 10 KONTÖR'}
                </Typography>
                <Typography sx={{ color: theme.palette.grey['400'], mb: 3 }}>
                  {'7/24 DESTEK'}
                </Typography>
                <Button
                  color={'info'}
                  variant={'contained'}
                  size={'large'}
                  sx={{
                    mt: 'auto',
                  }}
                  onClick={() => handleSelectPackage(pkg)}
                >
                  {'Planı Seçin'}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Register() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingY: 3,
        background: theme.palette.grey['900'],
        color: theme.palette.common.white,
        textAlign: 'center'
      }}
    >
      <Container maxWidth={'lg'}>
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontSize: 32,
            fontWeight: 600
          }}
        >
          {'Hemen Başlayın!'}
        </Typography>
        <Typography
          sx={{
            mb: 3
          }}
        >
          {'Invosan ile muhasebe süreçlerinizi daha verimli hale getirin. Bize katılın ve farkı hissedin.!'}
        </Typography>
        <Button component={Link} variant={'contained'} color={'primary'} size={'large'} to={'/register'}>
          {'Kayıt Ol'}
        </Button>
      </Container>
    </Box>
  );
}

export default function Home() {
    const session = useSession();

    return (
        <>
          <Header />

          <Hero />

          <Features />

          <Pricing />

          {!session && <Register />}

          <Footer />
        </>
    );
}