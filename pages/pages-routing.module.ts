import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { CareCenterComponent } from "./careCenter/careCenter.component";
import { MedicamentComponent } from "./medicament/medicament.component";
import { DefineUserComponent } from "./defineUser/defineUser.component";
import { EmployeeComponent } from "./employee/employee.component";
import { FirstAcceptanceComponent } from "./firstAcceptance/firstAcceptance.component";
import { DefinePriceComponent } from "./definePrice/definePrice.component";
import { EmployeeListComponent } from "./listPages/employeeList/employeeList.component";
import { DisabledListComponent } from "./listPages/disabledList/disabledList.component";
import { UserListComponent } from "./listPages/userList/userList.component";
import { PsychosocialPlanListComponent } from "./plans/psychosocialPlanList/psychosocialPlanList.component";
import { GeneralPlanListComponent } from "./plans/generalPlanList/generalPlanList.component";
import { HealthPlanListComponent } from "./plans/healthPlanList/healthPlanList.component";
import { BireyselBakimPlanComponent } from "./plans/bireyselBakimPlan/bireyselBakimPlan.component";
import { IndividualCarePlanListComponent } from "./plans/Lists/individualCarePlanList/individualCarePlanList.component";
import { DisabletedActivitiyPlanComponent } from "./plans/disabletedActivitiyPlan/disabletedActivitiyPlan.component";
import { DrugTreatmentPlanComponent } from "./plans/drugTreatmentPlan/drugTreatmentPlan.component";
import { GuardActive } from "../guards/GuardActive";
import { DisabilityPeriodicExaminationFormComponent } from "./plans/disabilityPeriodicExaminationForm/disabilityPeriodicExaminationForm.component";
import { PersonalHealthPlanComponent } from "./plans/personalHealthPlan/personalHealthPlan.component";
import { DefineMedicamentComponent } from "./defineMedicament/defineMedicament.component";
import { DrugTreatmentPlanListComponent } from "./plans/Lists/drugTreatmentPlanList/drugTreatmentPlanList.component";
import { PersonalHealthPlanListComponent } from "./plans/Lists/personalHealthPlanList/personalHealthPlanList.component";
import { EngelliIzinFormuComponent } from "./plans/engelli-izin-formu/engelli-izin-formu.component";
import { EngelliSaglikKurumunaGidisGelisFormComponent } from "./plans/saglikFormlari/engelliSaglikKurumunaGidisGelisForm/engelliSaglikKurumunaGidisGelisForm.component";
import { SaglikYenidenDegerlendirmeFormuComponent } from "./plans/saglikFormlari/saglikYenidenDegerlendirmeFormu/saglikYenidenDegerlendirmeFormu.component";
import { ReglTakipFormuComponent } from "./plans/saglikFormlari/reglTakipFormu/reglTakipFormu.component";
import { TansiyonSekerTakipFormuComponent } from "./plans/saglikFormlari/tansiyonSekerTakipFormu/tansiyonSekerTakipFormu.component";
import { EpilepsiTakipFormuComponent } from "./plans/saglikFormlari/epilepsiTakipFormu/epilepsiTakipFormu.component";
import { RefakatciGörevlendirmeOnayFormuComponent } from "./plans/saglikFormlari/refakatciGörevlendirmeOnayFormu/refakatciGörevlendirmeOnayFormu.component";
import { SaglikBulgulariTakipFormuComponent } from "./plans/saglikFormlari/saglikBulgulariTakipFormu/saglikBulgulariTakipFormu.component";
import { TrakeostomiBakimiTakipFormuComponent } from "./plans/saglikFormlari/trakeostomiBakimiTakipFormu/trakeostomiBakimiTakipFormu.component";
import { AspirasyonTakipFormuComponent } from "./plans/saglikFormlari/aspirasyonTakipFormu/aspirasyonTakipFormu.component";
import { DüsmeOlayKayitFormuComponent } from "./plans/saglikFormlari/düsmeOlayKayitFormu/düsmeOlayKayitFormu.component";
import { StomaTakipFormuComponent } from "./plans/saglikFormlari/stomaTakipFormu/stomaTakipFormu.component";
import { KiloTakipFormuComponent } from "./plans/saglikFormlari/kiloTakipFormu/kiloTakipFormu.component";
import { SondaDegisimFormuComponent } from "./plans/saglikFormlari/sondaDegisimFormu/sondaDegisimFormu.component";
import { ChoosePageComponent } from './plans/choosePage/choosePage.component';
import { KayitFormListComponent } from "./plans/kayitFormList/kayitFormList.component";
import { TibbiAtikTeslikFormuComponent } from "./plans/saglikFormlari/tibbiAtikTeslikFormu/tibbiAtikTeslikFormu.component";
import { IlacImhaFormuComponent } from './plans/saglikFormlari/ilacImhaFormu/ilacImhaFormu.component';
import { BuzdolabiIsiTakipFormuComponent } from "./plans/saglikFormlari/buzdolabiIsiTakipFormu/buzdolabiIsiTakipFormu.component";
import { ExitusKartiComponent } from "./plans/saglikFormlari/exitusKarti/exitusKarti.component";
import { EngelliFizikTedaviVeFizyoterapiUygulamaPlaniFormuComponent } from "./plans/saglikFormlari/engelliFizikTedaviVeFizyoterapiUygulamaPlaniFormu/engelliFizikTedaviVeFizyoterapiUygulamaPlaniFormu.component";
import { SaglikPersoneliGözlemFormuComponent } from "./plans/saglikFormlari/saglikPersoneliGözlemFormu/saglikPersoneliGözlemFormu.component";
import { PansumanEnjeksiyonUygulamaFormuComponent } from "./plans/saglikFormlari/pansumanEnjeksiyonUygulamaFormu/pansumanEnjeksiyonUygulamaFormu.component";
import { MiadKontrolFormuComponent } from "./plans/saglikFormlari/miadKontrolFormu/miadKontrolFormu.component";
import { SaglikOdasiIsiNemTakipFormuComponent } from "./plans/saglikFormlari/saglikOdasiIsiNemTakipFormu/saglikOdasiIsiNemTakipFormu.component";
import { AcilDurumCantasiEkipmanIlacKontrolListesiComponent } from "./plans/saglikFormlari/acilDurumCantasiEkipmanIlacKontrolListesi/acilDurumCantasiEkipmanIlacKontrolListesi.component";
import { EngelliKabulFormuComponent } from "./plans/psikoSosyalFormlar/engelliKabulFormu/engelliKabulFormu.component";
import { IlkGörüsmeDegerlendirmeRaporuComponent } from "./plans/psikoSosyalFormlar/ilkGörüsmeDegerlendirmeRaporu/ilkGörüsmeDegerlendirmeRaporu.component";
import { EtkinlikKatılımVeDegerlendirmeFormuComponent } from "./plans/psikoSosyalFormlar/etkinlikKatılımVeDegerlendirmeFormu/etkinlikKatılımVeDegerlendirmeFormu.component";
import { BireyleMeslekiCalismaRaporuComponent } from "./plans/psikoSosyalFormlar/bireyleMeslekiCalismaRaporu/bireyleMeslekiCalismaRaporu.component";
import { GruplaMeslekiCalismaRaporuComponent } from "./plans/psikoSosyalFormlar/gruplaMeslekiCalismaRaporu/gruplaMeslekiCalismaRaporu.component";
import { DegerlendirmeKuruluKararFormuComponent } from "./plans/psikoSosyalFormlar/degerlendirmeKuruluKararFormu/degerlendirmeKuruluKararFormu.component";
import { EngelliMülkiyetiTeslimAlmaEtmeFormuComponent } from "./plans/psikoSosyalFormlar/engelliMülkiyetiTeslimAlmaEtmeFormu/engelliMülkiyetiTeslimAlmaEtmeFormu.component";
import { ToplumlaMeslekiÇalışmaRaporuComponent } from "./plans/psikoSosyalFormlar/toplumlaMeslekiÇalışmaRaporu/toplumlaMeslekiÇalışmaRaporu.component";
import { MeslekiCalismaKayitDefteriComponent } from "./plans/psikoSosyalFormlar/meslekiCalismaKayitDefteri/meslekiCalismaKayitDefteri.component";
import { VakaTartismaVeDegerlendirmeRaporuComponent } from "./plans/psikoSosyalFormlar/vakaTartismaVeDegerlendirmeRaporu/vakaTartismaVeDegerlendirmeRaporu.component";
import { VakaKapatmaFormuComponent } from "./plans/psikoSosyalFormlar/vakaKapatmaFormu/vakaKapatmaFormu.component";
import { EngelliOryantasyonFormuComponent } from "./plans/psikoSosyalFormlar/engelliOryantasyonFormu/engelliOryantasyonFormu.component";
import { GenelVücutKontrolFormuComponent } from "./plans/saglikFormlari/genelVücutKontrolFormu/genelVücutKontrolFormu.component";
import { KimlikTanimlamaFormuComponent } from "./plans/saglikFormlari/kimlikTanimlamaFormu/kimlikTanimlamaFormu.component";
import { GörevlendirmeFormuComponent } from "./plans/genelFormlar/görevlendirmeFormu/görevlendirmeFormu.component";
import { UygunsuzlukVeDüzelticiFaaliyetFormuComponent } from "./plans/genelFormlar/uygunsuzlukVeDüzelticiFaaliyetFormu/uygunsuzlukVeDüzelticiFaaliyetFormu.component";
import { KurumsalBilgiKayitFormuComponent } from "./plans/genelFormlar/kurumsalBilgiKayitFormu/kurumsalBilgiKayitFormu.component";
import { IsBasvuruFormuComponent } from "./plans/genelFormlar/isBasvuruFormu/isBasvuruFormu.component";
import { OryantasyonEgitimFormuComponent } from "./plans/genelFormlar/oryantasyonEgitimFormu/oryantasyonEgitimFormu.component";
import { EgitimOneriFormuComponent } from "./plans/genelFormlar/egitimOneriFormu/egitimOneriFormu.component";
import { DuyuruFormuComponent } from "./plans/genelFormlar/duyuruFormu/duyuruFormu.component";
import { EgitimKatilimVeEtkinlikDegerlendirmeFormuComponent } from "./plans/genelFormlar/egitimKatilimVeEtkinlikDegerlendirmeFormu/egitimKatilimVeEtkinlikDegerlendirmeFormu.component";
import { PersonelEgitimTakipKartiComponent } from "./plans/genelFormlar/personelEgitimTakipKarti/personelEgitimTakipKarti.component";
import { YillikIzinFormuComponent } from "./plans/genelFormlar/yillikIzinFormu/yillikIzinFormu.component";
import { BakimOnarimTakipKartiComponent } from "./plans/genelFormlar/bakimOnarimTakipKarti/bakimOnarimTakipKarti.component";
import { ArizaBildirimFormuComponent } from "./plans/genelFormlar/arizaBildirimFormu/arizaBildirimFormu.component";
import { KalibrasyonTakipFormuComponent } from "./plans/genelFormlar/kalibrasyonTakipFormu/kalibrasyonTakipFormu.component";
import { IcTetkikUygunsuzlukFormuComponent } from "./plans/genelFormlar/icTetkikUygunsuzlukFormu/icTetkikUygunsuzlukFormu.component";
import { SuDeposuTemizlikFormuComponent } from "./plans/genelFormlar/suDeposuTemizlikFormu/suDeposuTemizlikFormu.component";
import { KaliteHedefleriDegerlendirmeFormuComponent } from "./plans/genelFormlar/kaliteHedefleriDegerlendirmeFormu/kaliteHedefleriDegerlendirmeFormu.component";
import { KysPerformansRaporuComponent } from "./plans/genelFormlar/kysPerformansRaporu/kysPerformansRaporu.component";
import { TutanakComponent } from "./plans/genelFormlar/tutanak/tutanak.component";
import { EngelliTeslimAlmaEtmeFormuComponent } from "./plans/genelFormlar/engelliTeslimAlmaEtmeFormu/engelliTeslimAlmaEtmeFormu.component";
import { ToplantiTutanagiFormuComponent } from "./plans/genelFormlar/toplantiTutanagiFormu/toplantiTutanagiFormu.component";
import { SiparisFormuComponent } from "./plans/genelFormlar/siparisFormu/siparisFormu.component";
import { OlayBildirimFormuComponent } from "./plans/genelFormlar/olayBildirimFormu/olayBildirimFormu.component";
import { EngelliYemekTalepFormuComponent } from "./plans/genelFormlar/engelliYemekTalepFormu/engelliYemekTalepFormu.component";
import { TeklifAlmaFormuComponent } from "./plans/genelFormlar/teklifAlmaFormu/teklifAlmaFormu.component";
import { MalzemeTalepVeGirdiKontrolFormuComponent } from "./plans/genelFormlar/malzemeTalepVeGirdiKontrolFormu/malzemeTalepVeGirdiKontrolFormu.component";
import { OkulRehabilitsyonTakipFormuComponent } from "./plans/psikoSosyalFormlar/okulRehabilitsyonTakipFormu/okulRehabilitsyonTakipFormu.component";
import { SosyaLIncelemeRaporuComponent } from "./plans/psikoSosyalFormlar/sosyaLIncelemeRaporu/sosyaLIncelemeRaporu.component";
import { IcTetkikRaporuComponent } from "./plans/genelFormlar/icTetkikRaporu/icTetkikRaporu.component";
import { BasiYarasiDegerlendirmeFormuComponent } from "./plans/saglikFormlari/BasiYarasiDegerlendirmeFormu/BasiYarasiDegerlendirmeFormu.component";
import { YatagaBagliEngelliBeslenmeKayitFormuComponent } from "./plans/saglikFormlari/yatagaBagliEngelliBeslenmeKayitFormu/yatagaBagliEngelliBeslenmeKayitFormu.component";
import { MazeretIzniTalepFormuComponent } from "./plans/genelFormlar/mazeretIzniTalepFormu/mazeretIzniTalepFormu.component";
import { FormDefinitionComponent } from "./formDefinition/formDefinition.component";
import { LogbookComponent } from "./logbook/logbook.component";
import { DisabletedActivityPlanListComponent } from "./plans/Lists/disabletedActivityPlanList/disabletedActivityPlanList.component";
import { OrdersComponent } from "./orders/orders.component";
import { IstatistiklerComponent } from "./listPages/istatistikler/istatistikler.component";
import { GüncelDökümanListComponent } from "./listPages/güncel-döküman-list/güncel-döküman-list.component";


const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "ui-features",
        loadChildren: "./ui-features/ui-features.module#UiFeaturesModule"
      },
      {
        path: "careCenter",
        component: CareCenterComponent
      },
      {
        path: "logbook",
        component: LogbookComponent
      },
      {
        path: "orders",
        component: OrdersComponent
      },
      {
        path: "disabletedActivityPlanList",
        component: DisabletedActivityPlanListComponent
      },
      {
        path: "ilac-tanimla",
        component: DefineMedicamentComponent
      },
      {
        path: "defineUser",
        component: DefineUserComponent
      },
      {
        path: "formDefinition",
        component: FormDefinitionComponent
      },
      {
        path: "employee",
        component: EmployeeComponent
      },
      {
        path: "medicament",
        component: MedicamentComponent
      },
      {
        path: "firstAcceptance",
        component: FirstAcceptanceComponent
      },
      {
        path: "defineprice",
        component: DefinePriceComponent
      },
      {
        path: "employeelist",
        component: EmployeeListComponent
      },
      {
        path: "disabledlist",
        component: DisabledListComponent
      },
      {
        path: "userlist",
        component: UserListComponent
      },
      {
        path: "psychosocialPlanList",
        component: PsychosocialPlanListComponent
      },
      {
        path: "generalPlanList",
        component: GeneralPlanListComponent
      },
      {
        path: "healtPlanList",
        component: HealthPlanListComponent
      },
      {
        path: "bireyselbakimplanList",
        component: IndividualCarePlanListComponent
      },
      {
        path: "bireyselbakimplan",
        component: BireyselBakimPlanComponent
      },
      {
        path: "engelliEtkinlikPlanı",
        component: DisabletedActivitiyPlanComponent
      },
      {
        path: "ilactedaviplanı",
        component: DrugTreatmentPlanComponent
      },
      {
        path: "engelli-periyodik-muayene-form",
        component: DisabilityPeriodicExaminationFormComponent
      },
      {
        path: "kisisel-saglik-bakim-plani",
        component: PersonalHealthPlanComponent
      },
      {
        path: "kisisel-saglik-bakim-plani-list",
        component: PersonalHealthPlanListComponent
      },
      {
        path: "ilac-tedavi-plan-list",
        component: DrugTreatmentPlanListComponent
      },
      {
        path: "engelli-izin-formu",
        component: EngelliIzinFormuComponent
      },
      {
        path: "engelli-saglik-kurum-gidis-gelis-formu",
        component: EngelliSaglikKurumunaGidisGelisFormComponent
      },
      {
        path: "engelli-saglik-yeniden-degerlendirme-formu",
        component: SaglikYenidenDegerlendirmeFormuComponent
      },
      {
        path: "engelli-regl-takip-formu",
        component: ReglTakipFormuComponent
      },
      {
        path: "engelli-tansiyon-seker-takip-formu",
        component: TansiyonSekerTakipFormuComponent
      },
      {
        path: "engelli-epilepsi-takip-formu",
        component: EpilepsiTakipFormuComponent
      },
      {
        path: "engelli-refakatci-görevlendirme-onay-formu",
        component: RefakatciGörevlendirmeOnayFormuComponent
      },
      {
        path: "engelli-saglik-bulgulari-takip-formu",
        component: SaglikBulgulariTakipFormuComponent
      },
      {
        path: "engelli-trakeostomi-bakimi-takip-formu",
        component: TrakeostomiBakimiTakipFormuComponent
      },
      {
        path: "engelli-aspirasyon-takip-formu",
        component: AspirasyonTakipFormuComponent
      },
      {
        path: "engelli-düsme-olay-kayit-formu",
        component: DüsmeOlayKayitFormuComponent
      },
      {
        path: "engelli-stoma-takip-formu",
        component: StomaTakipFormuComponent
      },
      {
        path: "engelli-kilo-takip-formu",
        component: KiloTakipFormuComponent
      },
      {
        path: "engelli-sonda-degisim-formu",
        component: SondaDegisimFormuComponent
      },
      {
        path: "engelli-tibbi-atik-teslim-formu",
        component: TibbiAtikTeslikFormuComponent
      },
      {
        path: "engelli-ilac-imha-formu",
        component: IlacImhaFormuComponent
      },
      {
        path: "engelli-buzdolabi-isi-takip-formu",
        component: BuzdolabiIsiTakipFormuComponent
      },
      {
        path: "engelli-exitus-karti",
        component: ExitusKartiComponent
      },
      {
        path: "engelli-fizik-ve-fizyoterapi-uygulama-plani-formu",
        component: EngelliFizikTedaviVeFizyoterapiUygulamaPlaniFormuComponent
      },
      {
        path: "engelli-saglik-personeli-gözlem-formu",
        component: SaglikPersoneliGözlemFormuComponent
      },
      {
        path: "engelli-pansuman-enjeksiyon-uygulama-formu",
        component: PansumanEnjeksiyonUygulamaFormuComponent
      },
      {
        path: "engelli-miad-kontrol-formu",
        component: MiadKontrolFormuComponent
      },
      {
        path: "engelli-saglik-odasi-isi-nem-takip-formu",
        component: SaglikOdasiIsiNemTakipFormuComponent
      },
      {
        path: "engelli-acil-durum-cantasi-ekipman-ilac-kontrol-listesi",
        component: AcilDurumCantasiEkipmanIlacKontrolListesiComponent
      },
      {
        path: "engelli-kabul-formu",
        component: EngelliKabulFormuComponent
      },
      {
        path: "engelli-ilk-görüsme-degerlendirme-raporu",
        component: IlkGörüsmeDegerlendirmeRaporuComponent
      },
      {
        path: "engelli-etkinlik-katilim-ve-degerlendirme-formu",
        component: EtkinlikKatılımVeDegerlendirmeFormuComponent
      },
      {
        path: "engelli-bireyle-mesleki-calisma-raporu",
        component: BireyleMeslekiCalismaRaporuComponent
      },
      {
        path: "engelli-grupla-mesleki-calisma-raporu",
        component: GruplaMeslekiCalismaRaporuComponent
      },
      {
        path: "engelli-degerlendirme-kurulu-karar-formu",
        component: DegerlendirmeKuruluKararFormuComponent
      },
      {
        path: "engelli-mülkiyet-teslim-alma-etme-formu",
        component: EngelliMülkiyetiTeslimAlmaEtmeFormuComponent
      },
      {
        path: "engelli-toplumla-mesleki-calisma-raporu",
        component: ToplumlaMeslekiÇalışmaRaporuComponent
      },
      {
        path: "engelli-mesleki-calisma-kayit-defteri",
        component: MeslekiCalismaKayitDefteriComponent
      },
      {
        path: "engelli-vaka-tartisma-ve-degerlendirme-raporu",
        component: VakaTartismaVeDegerlendirmeRaporuComponent
      },
      {
        path: "engelli-vaka-kapatma-formu",
        component: VakaKapatmaFormuComponent
      },
      {
        path: "engelli-oryantasyon-formu",
        component: EngelliOryantasyonFormuComponent
      },
      {
        path: "engelli-genel-vücut-kontrol-formu",
        component: GenelVücutKontrolFormuComponent
      },
      {
        path: "engelli-kimlik-tanimlama-formu",
        component: KimlikTanimlamaFormuComponent
      },
      {
        path: "engelli-görevlendirme-formu",
        component: GörevlendirmeFormuComponent
      },
      {
        path: "engelli-uygunsuzluk-ve-düzeltici-faaliyet-formu",
        component: UygunsuzlukVeDüzelticiFaaliyetFormuComponent
      },
      {
        path: "engelli-kurumsal-bilgi-kayit-formu",
        component: KurumsalBilgiKayitFormuComponent
      },
      {
        path: "engelli-is-basvuru-formu",
        component: IsBasvuruFormuComponent
      },
      {
        path: "engelli-oryantasyon-egitim-formu",
        component: OryantasyonEgitimFormuComponent
      },
      {
        path: "engelli-egitim-öneri-formu",
        component: EgitimOneriFormuComponent
      },
      {
        path: "engelli-duyuru-formu",
        component: DuyuruFormuComponent
      },
      {
        path: "engelli-egitim-katilim-ve-etkinlik-degerlendirme-formu",
        component: EgitimKatilimVeEtkinlikDegerlendirmeFormuComponent
      },
      {
        path: "engelli-personel-egitim-takip-karti",
        component: PersonelEgitimTakipKartiComponent
      },
      {
        path: "engelli-yillik-izin-formu",
        component: YillikIzinFormuComponent
      },
      {
        path: "engelli-bakim-onarim-takip-karti",
        component: BakimOnarimTakipKartiComponent
      },
      {
        path: "engelli-ariza-bildirim-formu",
        component: ArizaBildirimFormuComponent
      },
      {
        path: "engelli-kalibrasyon-takip-formu",
        component: KalibrasyonTakipFormuComponent
      },
      {
        path: "engelli-ic-tetkik-uygunsuzluk-formu",
        component: IcTetkikUygunsuzlukFormuComponent
      },
      {
        path: "engelli-su-deposu-temizlik-formu",
        component: SuDeposuTemizlikFormuComponent
      },
      {
        path: "engelli-kalite-hedefleri-degerlendirme-formu",
        component: KaliteHedefleriDegerlendirmeFormuComponent
      },
      {
        path: "engelli-kys-performans-raporu",
        component: KysPerformansRaporuComponent
      },
      {
        path: "engelli-tutanak",
        component: TutanakComponent
      },
      {
        path: "engelli-teslim-alma-etme-formu",
        component: EngelliTeslimAlmaEtmeFormuComponent
      },
      {
        path: "engelli-toplanti-tutanagi-formu",
        component: ToplantiTutanagiFormuComponent
      },
      {
        path: "engelli-siparis-formu",
        component: SiparisFormuComponent
      },
      {
        path: "engelli-olay-bildirim-formu",
        component: OlayBildirimFormuComponent
      },
      {
        path: "engelli-yemek-talep-formu",
        component: EngelliYemekTalepFormuComponent
      },
      {
        path: "engelli-teklif-alma-formu",
        component: TeklifAlmaFormuComponent
      },
      {
        path: "engelli-malzeme-talep-ve-girdi-kontrol-formu",
        component: MalzemeTalepVeGirdiKontrolFormuComponent
      },
      {
        path: "engelli-okul-rehabilitsyon-takip-formu",
        component: OkulRehabilitsyonTakipFormuComponent
      },
      {
        path: "engelli-soyal-inceleme-raporu",
        component: SosyaLIncelemeRaporuComponent
      },
      {
        path: "engelli-ic-tetkik-raporu",
        component: IcTetkikRaporuComponent
      },
      {
        path: "engelli-basi-yarasi-degerlendirme-formu",
        component: BasiYarasiDegerlendirmeFormuComponent
      },
      {
        path: "engelli-yataga-bagli-engelli-beslenme-kayit-formu",
        component: YatagaBagliEngelliBeslenmeKayitFormuComponent
      },
      {
        path: "engelli-mazeret-izni-talep-formu",
        component: MazeretIzniTalepFormuComponent
      },  {
        path: "istatistikler",
        component: IstatistiklerComponent
      },
      {
        path: "güncel-döküman-list",
        component: GüncelDökümanListComponent
      },
  {
    path: 'choseepage',
    component:ChoosePageComponent
  },  {
    path: 'choseepage1',
    component:ChoosePageComponent
  },  {
    path: 'choseepage2',
    component:ChoosePageComponent
  },{
    path: 'kayitFormu',
    component:KayitFormListComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }], canActivate: [GuardActive],
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
// {
//   path: 'components',
//   loadChildren: './components/components.module#ComponentsModule',
// }, {
//   path: 'maps',
//   loadChildren: './maps/maps.module#MapsModule',
// }, {
//   path: 'charts',
//   loadChildren: './charts/charts.module#ChartsModule',
// }, {
//   path: 'editors',
//   loadChildren: './editors/editors.module#EditorsModule',
// }, {
//   path: 'forms',
//   loadChildren: './forms/forms.module#FormsModule',
// }, {
//   path: 'tables',
//   loadChildren: './tables/tables.module#TablesModule',
// }, {
//   path: 'miscellaneous',
//   loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
// },
