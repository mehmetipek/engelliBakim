import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Bilgi Tanımlama',
    icon: 'nb-compose',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Bakım Merkezi Tanımla',
        link: '/pages/careCenter',
      },
      {
        title: 'Personel Tanımla',
        link: '/pages/employee',
      },
      
      {
        title: 'İlk Kabul İşlemi',
        link: '/pages/firstAcceptance',
      },
      // {
      //   title: 'Grup Tanımla',
      //   link: '/',
      // },
      // {
      //   title: 'İlaç Tanımla',
      //   link: '/',
      // },
      {
        title: 'İlaç Tanımla',
        link: '/pages/ilac-tanimla',
      },
      {
        title: 'Kullanıcı Tanımla',
        link: '/pages/defineUser',
      },
      {
        title: 'Ücret Tanımlama',
        link: '/pages/defineprice'
      },
      {
        title: 'Döküman Tanımlama',
        link: '/pages/formDefinition'
      }
      // {
      //   title: 'Bakım Merkezi Tanımla',
      //   link: '/pages/ui-features/buttons',
      // },
      // {
      //   title: 'Kurucu Müdür Tanımla',
      //   link: '/pages/ui-features/grid',
      // },
      // {
      //   title: 'Sorumlu Müdür Tanımla',
      //   link: '/pages/ui-features/icons',
      // },
      // {
      //   title: 'Personel Tanımla',
      //   link: '/pages/ui-features/modals',
      // },
      // {
      //   title: 'Kullanıcı Tanımla',
      //   link: '/pages/ui-features/popovers',
      // },
      // {
      //   title: 'Grup Tanımla',
      //   link: '/pages/ui-features/typography',
      // },
      // {
      //   title: 'İlaç Tanımla',
      //   link: '/pages/ui-features/search-fields',
      // }
      // },
      // {
      //   title: 'Tabs',
      //   link: '/pages/ui-features/tabs',
      // },
    ],
  },
  {
    title: 'Listeler',
    icon: 'nb-list',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Personel Listesi',
        link: '/pages/employeelist',
      },
      {
        title: 'Engelli Listesi',
        link: '/pages/disabledlist',
      },
      {
        title: 'Kullanıcı Listesi',
        link: '/pages/userlist',
      },


      {
        title: 'İlaç Listesi',
        link: '/pages/medicament'
      },
      {
        title: 'İstatistikler',
        link: '/pages/istatistikler'
      }
      ,
      {
        title: 'Güncel Döküman Listesi',
        link: '/pages/güncel-döküman-list'
      }
    ],
  },
  {
    title: 'Planlamalar',
    icon: 'ion-clipboard',
    link: '/pages/ui-features',
    children: [
      // {
      //   title: 'Psiko Sosyal',
      //   link: '/pages/psychosocialPlanList',
      // },
      // {
      //   title: 'Sağlık Hizmetleri',
      //   link: '/pages/healtPlanList',
      // }, {
      //   title: 'Genel',
      //   link: '/pages/generalPlanList',
      // }
      {
        title: 'Psiko Sosyal',
        link: "/pages/choseepage",
        queryParams:{"ktg":"psikoSosyal"}
      },
      {
        title: 'Sağlık Hizmetleri',
        link: "/pages/choseepage1",
        queryParams:{"ktg":"health"}
      }, {
        title: 'Genel',
        link: "/pages/choseepage2",
        queryParams:{"ktg":"genel"}
      },
      {
        title: 'İş Emirleri',
        link: "/pages/orders",
        queryParams:{"ktg":"orders"}
      }
    ],
  },
  {
    title: 'Defterler',
    icon: 'ion-ios-book',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Kütük Defteri',
        link: '/pages/logbook',
      },
      {
        title: 'Mesleki Çalışma Kayıt Defteri',
        link: '/pages/engelli-mesleki-calisma-kayit-defteri',
        queryParams:{"ktg":"psikoSosyal"}
      },
      {
        title: 'Gelen Evrak',
        link: '/pages/',
      },
      {
        title: 'Giden Evrak',
        link: '/pages/',
      },
      {
        title: 'Harçlık',
        link: '/pages/'
      },
      {
        title: 'İç Hizmet Kayıt',
        link: '/pages/'
      },
      {
        title: 'Giysi',
        link: '/pages/'
      },
      {
        title: 'Emanet Hesabı',
        link: '/pages/'
      }
    ],
  },
  // {
  //   title: 'Dökümantasyon',
  //   icon: 'fa fa fa-book',
  //   children: [
  //     {
  //       title: 'Tree',
  //       link: '/',
  //     }, {
  //       title: 'Notifications',
  //       link: '/',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'nb-shuffle',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  //},
];
