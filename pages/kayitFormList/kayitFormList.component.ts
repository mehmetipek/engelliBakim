import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kayitFormList',
  templateUrl: './kayitFormList.component.html',
  styleUrls: ['./kayitFormList.component.scss']
})
export class KayitFormListComponent implements OnInit {
  public list:page=new page();
  public kategori: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.kategori = params["ktg"];
      this.list=this.pagelist.find(f=>f.ktgr==this.kategori);
    });
  }

  public pagelist: page[] = [
    {
      ktgr: "health",
      title: 'Sağlık Hizmet Kayıtları',
      list: [
        { code: 'SAĞ.FRM.001 ', name: 'Genel Vücut Kontrol Formu', link: '/engelli-genel-vücut-kontrol-formu' },
        { code: 'SAĞ.FRM.002', name: 'Engelli Sağlık Kurumuna Gidiş/Geliş Formu', link: '/engelli-saglik-kurum-gidis-gelis-formu' },
        { code: 'SAĞ.FRM.003', name: 'Sağlık Yeniden Değerlendirme Formu', link: '/engelli-saglik-yeniden-degerlendirme-formu' },
        { code: 'SAĞ.FRM.004', name: 'Basi Yarası Değerlendirme Formu', link: '/engelli-basi-yarasi-degerlendirme-formu' },        
        { code: 'SAĞ.FRM.005 ', name: 'Regl Takip Formu', link: '/engelli-regl-takip-formu' },
        { code: 'SAĞ.FRM.007', name: 'Tansiyon/Şeker Takip Formu', link: '/engelli-tansiyon-seker-takip-formu' },
        { code: 'SAĞ.FRM.008', name: 'Epilepsi Takip Formu', link: '/engelli-epilepsi-takip-formu' },
        { code: 'SAĞ.FRM.009', name: 'Refakatçi Görevlendirme Onay Formu', link: '/engelli-refakatci-görevlendirme-onay-formu' },
        { code: 'SAĞ.FRM.010', name: 'Sağlık Bulguları Takip Formu', link: '/engelli-saglik-bulgulari-takip-formu' },
        { code: 'SAĞ.FRM.012', name: 'Trakeostomi Bakımı Takip Formu', link: '/engelli-trakeostomi-bakimi-takip-formu' },
        { code: 'SAĞ.FRM.013', name: 'Aspirasyon Takip Formu', link: '/engelli-aspirasyon-takip-formu' },
        { code: 'SAĞ.FRM.016', name: 'Düşme Olay Kayıt Formu', link: '/engelli-düsme-olay-kayit-formu' },
        { code: 'SAĞ.FRM.018', name: 'Yatağa Bağımlı Engelli Beslenme(ENTERAL) Kayıt Formu', link: '/engelli-yataga-bagli-engelli-beslenme-kayit-formu' },
        { code: 'SAĞ.FRM.019', name: 'ACİL DURUM ÇANTASI EKİPMAN/İLAÇ KONTROL LİSTESİ', link: '/engelli-acil-durum-cantasi-ekipman-ilac-kontrol-listesi' },
        { code: 'SAĞ.FRM.021', name: 'Stoma Takip Formu', link: '/engelli-stoma-takip-formu' },
        { code: 'SAĞ.FRM.022', name: 'Engelli Fizik Tedavi Ve Fizyoterapi Uygulama Plani Formu', link: '/engelli-fizik-ve-fizyoterapi-uygulama-plani-formu' },
        { code: 'SAĞ.FRM.023', name: 'Kilo Takip Formu', link: '/engelli-kilo-takip-formu' },
        { code: 'SAĞ.FRM.024', name: 'Sonda Değişim Formu', link: '/engelli-sonda-degisim-formu' },
        { code: 'SAĞ.FRM.025', name: 'Kimlik Tanimlama Formu', link: '/engelli-kimlik-tanimlama-formu' },       
        { code: 'SAĞ.FRM.026', name: 'Tıbbi Atık Teslim Formu', link: '/engelli-tibbi-atik-teslim-formu' },
        { code: 'SAĞ.FRM.027', name: 'İlaç İmha Formu', link: '/engelli-ilac-imha-formu' },
        { code: 'SAĞ.FRM.028', name: 'SAĞLIK PERSONELİ GÖZLEM FORMU', link: '/engelli-saglik-personeli-gözlem-formu' },
        { code: 'SAĞ.FRM.029', name: 'EXITUS KARTI', link: '/engelli-exitus-karti' },
        { code: 'SAĞ.FRM.030', name: 'PANSUMAN/ENJEKSİYON UYGULAMA FORMU', link: '/engelli-pansuman-enjeksiyon-uygulama-formu' },
        { code: 'SAĞ.FRM.031', name: 'Buz Dolabı Isı Takip Formu', link: '/engelli-buzdolabi-isi-takip-formu' },
        { code: 'SAĞ.FRM.032', name: 'SAĞLIK ODASI ISI NEM TAKİP FORMU', link: '/engelli-saglik-odasi-isi-nem-takip-formu' },
        { code: 'SAĞ.FRM.033', name: 'MİAD KONTROL FORMU', link: '/engelli-miad-kontrol-formu' },
      ]
    },
    {
      ktgr: "psikoSosyal",
      title: 'Psiko Sosyal Kayıtlar',
      list: [
        { code: 'PSD.FRM.001', name: ' İLK KABUL FORMU', link: '/engelli-kabul-formu' },
        { code: 'PSD.FRM.002', name: 'İlk Görüsme Değerlendirme Raporu', link: '/engelli-ilk-görüsme-degerlendirme-raporu' },
        { code: 'PSD.FRM.004', name: 'Etkinlik Katılım ve Değerlendirme Formu', link: '/engelli-etkinlik-katilim-ve-degerlendirme-formu' },
        { code: 'PSD.FRM.005', name: 'Bireyle Mesleki Çalışma Raporu', link: '/engelli-bireyle-mesleki-calisma-raporu' },
        { code: 'PSD.FRM.006', name: 'Grupla Mesleki Çalışma Raporu', link: '/engelli-grupla-mesleki-calisma-raporu' },
        { code: 'PSD.FRM.007', name: 'Değerlendirme Kurulu Karar Formu', link: '/engelli-degerlendirme-kurulu-karar-formu' },
        //{ code: 'PSD.FRM.008', name: 'Kütük Defteri', link: '/engelli-kütük-defteri' },
        { code: 'PSD.FRM.010', name: 'Engelli Mülkiyeti Teslim Alma/Etme Formu', link: '/engelli-mülkiyet-teslim-alma-etme-formu' },
        { code: 'PSD.FRM.011', name: 'Toplumla Mesleki Çalışma Raporu', link: '/engelli-toplumla-mesleki-calisma-raporu' },
        //{ code: 'PSD.FRM.012', name: 'Mesleki Çalışma Kayıt Defteri', link: '/engelli-mesleki-calisma-kayit-defteri' },
        { code: 'PSD.FRM.013', name: 'Vaka Tartisma ve Değerlendirme Raporu', link: '/engelli-vaka-tartisma-ve-degerlendirme-raporu' },
        { code: 'PSD.FRM.014', name: 'Vaka Kapatma Formu', link: '/engelli-vaka-kapatma-formu' },
        { code: 'PSD.FRM.019', name: 'OKUL/REHABİLİTSYON TAKİP FORMU', link: '/engelli-okul-rehabilitsyon-takip-formu' },
        { code: 'PSD.FRM.020', name: 'SOSYAL İNCELEME RAPORU', link: '/engelli-soyal-inceleme-raporu' },
        { code: 'PSD.FRM.021', name: 'Engelli İzin Formu', link: '/engelli-izin-formu' },
        { code: 'PSD.FRM.022', name: 'Engelli Oryantasyon Formu', link: '/engelli-oryantasyon-formu' },
      ]
    },
    {
      ktgr: "genel",
      title: 'Genel Formlar',
      list: [
        { code: 'GNL.FRM.007', name: 'Görevlendirme Formu', link: '/engelli-görevlendirme-formu' },
        { code: 'GNL.FRM.008', name: 'Uygunsuzluk ve Düzeltici Faaliyet Formu', link: '/engelli-uygunsuzluk-ve-düzeltici-faaliyet-formu' },
        { code: 'GNL.FRM.009', name: 'KURUMSAL BİLGİ KAYIT FORMU', link: '/engelli-kurumsal-bilgi-kayit-formu' },
        { code: 'GNL.FRM.0012', name: 'İŞ BAŞVURU FORMU', link: '/engelli-is-basvuru-formu' },
        { code: 'GNL.FRM.0014', name: 'ORYANTASYON EGİTİM FORMU', link: '/engelli-oryantasyon-egitim-formu' },
        { code: 'GNL.FRM.0015', name: 'EĞİTİM ÖNERİ FORMU', link: '/engelli-egitim-öneri-formu' },
        { code: 'GNL.FRM.0016', name: 'DUYURU FORMU', link: '/engelli-duyuru-formu' },
        { code: 'GNL.FRM.0017', name: 'EĞİTİM KATILIM ve ETKİNLİK DEĞERLENDİRME FORMU', link: '/engelli-egitim-katilim-ve-etkinlik-degerlendirme-formu' },
        { code: 'GNL.FRM.0018', name: 'PERSONEL EĞİTİM TAKİP KARTI', link: '/engelli-personel-egitim-takip-karti' },
        { code: 'GNL.FRM.0020', name: 'YILLIK İZİN FORMU', link: '/engelli-yillik-izin-formu' },
        { code: 'GNL.FRM.0021', name: 'MAZERET İZİN FORMU', link: '/engelli-mazeret-izni-talep-formu' },
        { code: 'GNL.FRM.0023', name: 'KALİBRASYON TAKİP FORMU', link: '/engelli-kalibrasyon-takip-formu' },
        { code: 'GNL.FRM.0024', name: 'ARIZA BİLDİRİM FORMU', link: '/engelli-ariza-bildirim-formu' },
        { code: 'GNL.FRM.0025', name: 'BAKIM ONARIM TAKİP KARTI', link: '/engelli-bakim-onarim-takip-karti' },
        { code: 'GNL.FRM.0029', name: 'İÇ TETKİK UYGUNSUZLUK FORMU', link: '/engelli-ic-tetkik-uygunsuzluk-formu'},
        { code: 'GNL.FRM.0030', name: 'İÇ TETKİK RAPORU', link: '/engelli-ic-tetkik-raporu'},
        { code: 'GNL.FRM.0033', name: 'MALZEME TALEP ve GİRDİ KONTROL FORMU', link: '/engelli-malzeme-talep-ve-girdi-kontrol-formu'},
        { code: 'GNL.FRM.0034', name: 'TEKLİF ALMA FORMU', link: '/engelli-teklif-alma-formu' },
        { code: 'GNL.FRM.0035', name: 'SU DEPOSU TEMİZLİK FORMU', link: '/engelli-su-deposu-temizlik-formu' },
        { code: 'GNL.FRM.0036', name: 'KALİTE HEDEFLERİ DEĞERLENDİRME FORMU', link: '/engelli-kalite-hedefleri-degerlendirme-formu' },
        { code: 'GNL.FRM.0044', name: 'ENGELLİ YEMEK TALEP FORMU', link: '/engelli-yemek-talep-formu' },
        { code: 'GNL.FRM.0045', name: 'OLAY BİLDİRİM FORMU', link: '/engelli-olay-bildirim-formu' },
        { code: 'GNL.FRM.0049', name: 'SİPARİŞ FORMU', link: '/engelli-siparis-formu' },
        { code: 'GNL.FRM.0051', name: 'KALİTE YÖNETİM TEMSİLCİSİ KALİTE YÖNETİM SİSTEMİ PERFORMANS RAPORU', link: '/engelli-kys-performans-raporu' },
        { code: 'GNL.FRM.0052', name: 'Toplantı Tutanağı Formu', link: '/engelli-toplanti-tutanagi-formu' }, 
        { code: 'GNL.FRM.0055', name: 'ENGELLİ TESLİM ALMA/ETME FORMU', link: '/engelli-teslim-alma-etme-formu' },
        { code: 'GNL.FRM.0056', name: 'TUTANAK', link: '/engelli-tutanak' },

      ]
    }
  ]
 
}

class page {
  public ktgr: string;
  public title: string;
  public list: dokuman[];
}
class dokuman {
  public code: string;
  public name: string;
  public link: string;
}