import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CareCenterComponent } from './careCenter/careCenter.component';
import { LoginComponent } from './login/login.component';
import { MedicamentComponent } from './medicament/medicament.component';
import { DefineUserComponent } from './defineUser/defineUser.component';
import { EmployeeComponent } from './employee/employee.component';
import { FirstAcceptanceComponent } from './firstAcceptance/firstAcceptance.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { DefinePriceComponent } from './definePrice/definePrice.component';
import { EmployeeListComponent } from './listPages/employeeList/employeeList.component';
import { DisabledListComponent } from './listPages/disabledList/disabledList.component';
import { UserListComponent } from './listPages/userList/userList.component';
import { HealthPlanListComponent } from './plans/healthPlanList/healthPlanList.component';
import { GeneralPlanListComponent } from './plans/generalPlanList/generalPlanList.component';
import { PsychosocialPlanListComponent } from './plans/psychosocialPlanList/psychosocialPlanList.component';
import { BireyselBakimPlanComponent } from './plans/bireyselBakimPlan/bireyselBakimPlan.component';
import { IndividualCarePlanEvaluationModalComponent } from './plans/individualCarePlanEvaluationModal/individualCarePlanEvaluationModal.component';
import { IndividualCarePlanListComponent } from './plans/Lists/individualCarePlanList/individualCarePlanList.component';
import { DrugTreatmentPlanComponent } from './plans/drugTreatmentPlan/drugTreatmentPlan.component';
import { DisabletedActivitiyPlanComponent } from './plans/disabletedActivitiyPlan/disabletedActivitiyPlan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GuardActive } from '../guards/GuardActive';
import { DisabilityPeriodicExaminationFormComponent } from './plans/disabilityPeriodicExaminationForm/disabilityPeriodicExaminationForm.component';
import { DisabilitySearchComponent } from './disabilitySearch/disabilitySearch.component';
import { PersonalHealthPlanComponent } from './plans/personalHealthPlan/personalHealthPlan.component';
import { DefineMedicamentComponent } from './defineMedicament/defineMedicament.component';
import { SearchEmployeeComponent } from '../components/searchEmployee/searchEmployee.component';
import { DrugTreatmentPlanListComponent } from './plans/Lists/drugTreatmentPlanList/drugTreatmentPlanList.component';
import { SearchDrugComponent } from '../components/searchDrug/searchDrug.component';
import { DisablitySearchInputComponent } from '../components/disablitySearchInput/disablitySearchInput.component';
import { PersonalHealthPlanListComponent } from './plans/Lists/personalHealthPlanList/personalHealthPlanList.component';
import { EngelliIzinFormuComponent } from './plans/engelli-izin-formu/engelli-izin-formu.component';
import { ChoosePageComponent } from './plans/choosePage/choosePage.component';
import { EngelliSaglikKurumunaGidisGelisFormComponent } from './plans/saglikFormlari/engelliSaglikKurumunaGidisGelisForm/engelliSaglikKurumunaGidisGelisForm.component';
import { SaglikYenidenDegerlendirmeFormuComponent } from './plans/saglikFormlari/saglikYenidenDegerlendirmeFormu/saglikYenidenDegerlendirmeFormu.component';
import { ReglTakipFormuComponent } from './plans/saglikFormlari/reglTakipFormu/reglTakipFormu.component';
import { TansiyonSekerTakipFormuComponent } from './plans/saglikFormlari/tansiyonSekerTakipFormu/tansiyonSekerTakipFormu.component';
import { EpilepsiTakipFormuComponent } from './plans/saglikFormlari/epilepsiTakipFormu/epilepsiTakipFormu.component';
import { RefakatciGörevlendirmeOnayFormuComponent } from './plans/saglikFormlari/refakatciGörevlendirmeOnayFormu/refakatciGörevlendirmeOnayFormu.component';
import { SaglikBulgulariTakipFormuComponent } from './plans/saglikFormlari/saglikBulgulariTakipFormu/saglikBulgulariTakipFormu.component';
import { TrakeostomiBakimiTakipFormuComponent } from './plans/saglikFormlari/trakeostomiBakimiTakipFormu/trakeostomiBakimiTakipFormu.component';
import { AspirasyonTakipFormuComponent } from './plans/saglikFormlari/aspirasyonTakipFormu/aspirasyonTakipFormu.component';
import { DüsmeOlayKayitFormuComponent } from './plans/saglikFormlari/düsmeOlayKayitFormu/düsmeOlayKayitFormu.component';
import { StomaTakipFormuComponent } from './plans/saglikFormlari/stomaTakipFormu/stomaTakipFormu.component';
import { KiloTakipFormuComponent } from './plans/saglikFormlari/kiloTakipFormu/kiloTakipFormu.component';
import { SondaDegisimFormuComponent } from './plans/saglikFormlari/sondaDegisimFormu/sondaDegisimFormu.component';
import { KayitFormListComponent } from './plans/kayitFormList/kayitFormList.component';
import { TibbiAtikTeslikFormuComponent } from './plans/saglikFormlari/tibbiAtikTeslikFormu/tibbiAtikTeslikFormu.component';
import { IlacImhaFormuComponent } from './plans/saglikFormlari/ilacImhaFormu/ilacImhaFormu.component';
import { BuzdolabiIsiTakipFormuComponent } from './plans/saglikFormlari/buzdolabiIsiTakipFormu/buzdolabiIsiTakipFormu.component';
import { ExitusKartiComponent } from './plans/saglikFormlari/exitusKarti/exitusKarti.component';
import { EngelliFizikTedaviVeFizyoterapiUygulamaPlaniFormuComponent } from './plans/saglikFormlari/engelliFizikTedaviVeFizyoterapiUygulamaPlaniFormu/engelliFizikTedaviVeFizyoterapiUygulamaPlaniFormu.component';
import { SaglikPersoneliGözlemFormuComponent } from './plans/saglikFormlari/saglikPersoneliGözlemFormu/saglikPersoneliGözlemFormu.component';
import { PansumanEnjeksiyonUygulamaFormuComponent } from './plans/saglikFormlari/pansumanEnjeksiyonUygulamaFormu/pansumanEnjeksiyonUygulamaFormu.component';
import { MiadKontrolFormuComponent } from './plans/saglikFormlari/miadKontrolFormu/miadKontrolFormu.component';
import { SaglikOdasiIsiNemTakipFormuComponent } from './plans/saglikFormlari/saglikOdasiIsiNemTakipFormu/saglikOdasiIsiNemTakipFormu.component';
import { AcilDurumCantasiEkipmanIlacKontrolListesiComponent } from './plans/saglikFormlari/acilDurumCantasiEkipmanIlacKontrolListesi/acilDurumCantasiEkipmanIlacKontrolListesi.component';
import { EngelliKabulFormuComponent } from './plans/psikoSosyalFormlar/engelliKabulFormu/engelliKabulFormu.component';
import { IlkGörüsmeDegerlendirmeRaporuComponent } from './plans/psikoSosyalFormlar/ilkGörüsmeDegerlendirmeRaporu/ilkGörüsmeDegerlendirmeRaporu.component';
import { EtkinlikKatılımVeDegerlendirmeFormuComponent } from './plans/psikoSosyalFormlar/etkinlikKatılımVeDegerlendirmeFormu/etkinlikKatılımVeDegerlendirmeFormu.component';
import { BireyleMeslekiCalismaRaporuComponent } from './plans/psikoSosyalFormlar/bireyleMeslekiCalismaRaporu/bireyleMeslekiCalismaRaporu.component';
import { GruplaMeslekiCalismaRaporuComponent } from './plans/psikoSosyalFormlar/gruplaMeslekiCalismaRaporu/gruplaMeslekiCalismaRaporu.component';
import { DegerlendirmeKuruluKararFormuComponent } from './plans/psikoSosyalFormlar/degerlendirmeKuruluKararFormu/degerlendirmeKuruluKararFormu.component';
import { EngelliMülkiyetiTeslimAlmaEtmeFormuComponent } from './plans/psikoSosyalFormlar/engelliMülkiyetiTeslimAlmaEtmeFormu/engelliMülkiyetiTeslimAlmaEtmeFormu.component';
import { ToplumlaMeslekiÇalışmaRaporuComponent } from './plans/psikoSosyalFormlar/toplumlaMeslekiÇalışmaRaporu/toplumlaMeslekiÇalışmaRaporu.component';
import { MeslekiCalismaKayitDefteriComponent } from './plans/psikoSosyalFormlar/meslekiCalismaKayitDefteri/meslekiCalismaKayitDefteri.component';
import { VakaTartismaVeDegerlendirmeRaporuComponent } from './plans/psikoSosyalFormlar/vakaTartismaVeDegerlendirmeRaporu/vakaTartismaVeDegerlendirmeRaporu.component';
import { VakaKapatmaFormuComponent } from './plans/psikoSosyalFormlar/vakaKapatmaFormu/vakaKapatmaFormu.component';
import { EngelliOryantasyonFormuComponent } from './plans/psikoSosyalFormlar/engelliOryantasyonFormu/engelliOryantasyonFormu.component';
import { GenelVücutKontrolFormuComponent } from './plans/saglikFormlari/genelVücutKontrolFormu/genelVücutKontrolFormu.component';
import { KimlikTanimlamaFormuComponent } from './plans/saglikFormlari/kimlikTanimlamaFormu/kimlikTanimlamaFormu.component';
import { GörevlendirmeFormuComponent } from './plans/genelFormlar/görevlendirmeFormu/görevlendirmeFormu.component';
import { UygunsuzlukVeDüzelticiFaaliyetFormuComponent } from './plans/genelFormlar/uygunsuzlukVeDüzelticiFaaliyetFormu/uygunsuzlukVeDüzelticiFaaliyetFormu.component';
import { KurumsalBilgiKayitFormuComponent } from './plans/genelFormlar/kurumsalBilgiKayitFormu/kurumsalBilgiKayitFormu.component';
import { IsBasvuruFormuComponent } from './plans/genelFormlar/isBasvuruFormu/isBasvuruFormu.component';
import { OryantasyonEgitimFormuComponent } from './plans/genelFormlar/oryantasyonEgitimFormu/oryantasyonEgitimFormu.component';
import { EgitimOneriFormuComponent } from './plans/genelFormlar/egitimOneriFormu/egitimOneriFormu.component';
import { DuyuruFormuComponent } from './plans/genelFormlar/duyuruFormu/duyuruFormu.component';
import { EgitimKatilimVeEtkinlikDegerlendirmeFormuComponent } from './plans/genelFormlar/egitimKatilimVeEtkinlikDegerlendirmeFormu/egitimKatilimVeEtkinlikDegerlendirmeFormu.component';
import { PersonelEgitimTakipKartiComponent } from './plans/genelFormlar/personelEgitimTakipKarti/personelEgitimTakipKarti.component';
import { YillikIzinFormuComponent } from './plans/genelFormlar/yillikIzinFormu/yillikIzinFormu.component';
import { BakimOnarimTakipKartiComponent } from './plans/genelFormlar/bakimOnarimTakipKarti/bakimOnarimTakipKarti.component';
import { ArizaBildirimFormuComponent } from './plans/genelFormlar/arizaBildirimFormu/arizaBildirimFormu.component';
import { KalibrasyonTakipFormuComponent } from './plans/genelFormlar/kalibrasyonTakipFormu/kalibrasyonTakipFormu.component';
import { IcTetkikUygunsuzlukFormuComponent } from './plans/genelFormlar/icTetkikUygunsuzlukFormu/icTetkikUygunsuzlukFormu.component';
import { SuDeposuTemizlikFormuComponent } from './plans/genelFormlar/suDeposuTemizlikFormu/suDeposuTemizlikFormu.component';
import { KaliteHedefleriDegerlendirmeFormuComponent } from './plans/genelFormlar/kaliteHedefleriDegerlendirmeFormu/kaliteHedefleriDegerlendirmeFormu.component';
import { KysPerformansRaporuComponent } from './plans/genelFormlar/kysPerformansRaporu/kysPerformansRaporu.component';
import { TutanakComponent } from './plans/genelFormlar/tutanak/tutanak.component';
import { EngelliTeslimAlmaEtmeFormuComponent } from './plans/genelFormlar/engelliTeslimAlmaEtmeFormu/engelliTeslimAlmaEtmeFormu.component';
import { ToplantiTutanagiFormuComponent } from './plans/genelFormlar/toplantiTutanagiFormu/toplantiTutanagiFormu.component';
import { SiparisFormuComponent } from './plans/genelFormlar/siparisFormu/siparisFormu.component';
import { OlayBildirimFormuComponent } from './plans/genelFormlar/olayBildirimFormu/olayBildirimFormu.component';
import { EngelliYemekTalepFormuComponent } from './plans/genelFormlar/engelliYemekTalepFormu/engelliYemekTalepFormu.component';
import { TeklifAlmaFormuComponent } from './plans/genelFormlar/teklifAlmaFormu/teklifAlmaFormu.component';
import { MalzemeTalepVeGirdiKontrolFormuComponent } from './plans/genelFormlar/malzemeTalepVeGirdiKontrolFormu/malzemeTalepVeGirdiKontrolFormu.component';
import { OkulRehabilitsyonTakipFormuComponent } from './plans/psikoSosyalFormlar/okulRehabilitsyonTakipFormu/okulRehabilitsyonTakipFormu.component';
import { SosyaLIncelemeRaporuComponent } from './plans/psikoSosyalFormlar/sosyaLIncelemeRaporu/sosyaLIncelemeRaporu.component';
import { IcTetkikRaporuComponent } from './plans/genelFormlar/icTetkikRaporu/icTetkikRaporu.component';
import { DisablitySearchWithTypeHeadComponent } from '../components/disablitySearchWithTypeHead/disablitySearchWithTypeHead.component';
import { FilterFormComponent } from '../components/filterForm/filterForm.component';
import { BasiYarasiDegerlendirmeFormuComponent } from './plans/saglikFormlari/BasiYarasiDegerlendirmeFormu/BasiYarasiDegerlendirmeFormu.component';
import { YatagaBagliEngelliBeslenmeKayitFormuComponent } from './plans/saglikFormlari/yatagaBagliEngelliBeslenmeKayitFormu/yatagaBagliEngelliBeslenmeKayitFormu.component';
import { MazeretIzniTalepFormuComponent } from './plans/genelFormlar/mazeretIzniTalepFormu/mazeretIzniTalepFormu.component';
import { FormDefinitionComponent } from './formDefinition/formDefinition.component';
import { VocationalRegistryComponent } from '../components/vocationalRegistry/vocationalRegistry.component';
import { FormHeaderComponent } from '../components/formHeader/formHeader.component';
import { FormSearchInputComponent } from '../components/formSearchInput/formSearchInput.component';
import { LogbookComponent } from './logbook/logbook.component';
import { DisabletedActivityPlanListComponent } from './plans/Lists/disabletedActivityPlanList/disabletedActivityPlanList.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { IstatistiklerComponent } from './listPages/istatistikler/istatistikler.component';
import { ChartsModule } from 'ng2-charts';
import { NbTabsetModule } from '@nebular/theme';
import { ImageOperationComponent } from '../components/imageOperation/imageOperation.component';
import { SixImageOperationComponent } from '../components/sixImageOperation/sixImageOperation.component';
import { WorkRegistryComponent } from '../components/workRegistry/workRegistry.component';
import { EngelliIlacRaporComponent } from '../modules/engelli-ilk-kabul/engelli-Ilac-Rapor/engelli-Ilac-Rapor.component';
import { PdfViewerComponent } from '../components/pdfViewer/pdfViewer.component';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { EngelliMamaRaporComponent } from '../modules/engelli-ilk-kabul/engelli-mama-rapor/engelli-mama-rapor.component';
import { NgxCurrencyModule } from "ngx-currency";
import { EngelliVasiComponent } from '../modules/engelli-ilk-kabul/engelli-vasi/engelli-vasi.component';
import { EngelliRaporlariComponent } from '../modules/engelli-ilk-kabul/engelli-raporlari/engelli-raporlari.component';
import { EngelliBezRaporlariComponent } from '../modules/engelli-ilk-kabul/engelli-bez-raporlari/engelli-bez-raporlari.component';
import { ModalComponent } from '../components/modal/modal.component';
import { GüncelDökümanListComponent } from './listPages/güncel-döküman-list/güncel-döküman-list.component';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule.forRoot(),
    MiscellaneousModule,
    TextMaskModule,
    ToasterModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    ChartsModule,
    NbTabsetModule,
    PdfJsViewerModule,
    NgxCurrencyModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    CareCenterComponent,
    MedicamentComponent,
    DefineUserComponent,
    EmployeeComponent,
    FirstAcceptanceComponent,
    DefinePriceComponent,
    EmployeeListComponent,
    DisabledListComponent,
    UserListComponent,
    PsychosocialPlanListComponent,
    HealthPlanListComponent,
    GeneralPlanListComponent,
    BireyselBakimPlanComponent,
    IndividualCarePlanEvaluationModalComponent,
    IndividualCarePlanListComponent,
    DrugTreatmentPlanComponent,
    DisabletedActivitiyPlanComponent,
    DisabilityPeriodicExaminationFormComponent,
    DisabilitySearchComponent,
    PersonalHealthPlanComponent,
    DefineMedicamentComponent,
    SearchEmployeeComponent,
    DrugTreatmentPlanListComponent,
    SearchDrugComponent,
    DisablitySearchInputComponent,
    PersonalHealthPlanComponent,
    PersonalHealthPlanListComponent,
    EngelliIzinFormuComponent,
    ChoosePageComponent,
    EngelliIzinFormuComponent,
    EngelliSaglikKurumunaGidisGelisFormComponent,
    SaglikYenidenDegerlendirmeFormuComponent,
    ReglTakipFormuComponent,
    TansiyonSekerTakipFormuComponent,
    EpilepsiTakipFormuComponent,
    RefakatciGörevlendirmeOnayFormuComponent,
    SaglikBulgulariTakipFormuComponent,
    TrakeostomiBakimiTakipFormuComponent,
    AspirasyonTakipFormuComponent,
    DüsmeOlayKayitFormuComponent,
    StomaTakipFormuComponent,
    KiloTakipFormuComponent,
    SondaDegisimFormuComponent,
    KayitFormListComponent,
    TibbiAtikTeslikFormuComponent,
    IlacImhaFormuComponent,
    BuzdolabiIsiTakipFormuComponent,
    ExitusKartiComponent,
    EngelliFizikTedaviVeFizyoterapiUygulamaPlaniFormuComponent,
    SaglikPersoneliGözlemFormuComponent,
    PansumanEnjeksiyonUygulamaFormuComponent,
    MiadKontrolFormuComponent,
    SaglikOdasiIsiNemTakipFormuComponent,
    AcilDurumCantasiEkipmanIlacKontrolListesiComponent,
    EngelliKabulFormuComponent,
    IlkGörüsmeDegerlendirmeRaporuComponent,
    EtkinlikKatılımVeDegerlendirmeFormuComponent,
    BireyleMeslekiCalismaRaporuComponent,
    GruplaMeslekiCalismaRaporuComponent,
    DegerlendirmeKuruluKararFormuComponent,
    EngelliMülkiyetiTeslimAlmaEtmeFormuComponent,
    ToplumlaMeslekiÇalışmaRaporuComponent,
    MeslekiCalismaKayitDefteriComponent,
    VakaTartismaVeDegerlendirmeRaporuComponent,
    VakaKapatmaFormuComponent,
    EngelliOryantasyonFormuComponent,
    GenelVücutKontrolFormuComponent,
    KimlikTanimlamaFormuComponent,
    GörevlendirmeFormuComponent,
    UygunsuzlukVeDüzelticiFaaliyetFormuComponent,
    KurumsalBilgiKayitFormuComponent,
    IsBasvuruFormuComponent,
    OryantasyonEgitimFormuComponent,
    EgitimOneriFormuComponent,
    DuyuruFormuComponent,
    EgitimKatilimVeEtkinlikDegerlendirmeFormuComponent,
    PersonelEgitimTakipKartiComponent,
    YillikIzinFormuComponent,
    BakimOnarimTakipKartiComponent,
    ArizaBildirimFormuComponent,
    KalibrasyonTakipFormuComponent,
    IcTetkikUygunsuzlukFormuComponent,
    SuDeposuTemizlikFormuComponent,
    KaliteHedefleriDegerlendirmeFormuComponent,
    KysPerformansRaporuComponent,
    TutanakComponent,
    EngelliTeslimAlmaEtmeFormuComponent,
    ToplantiTutanagiFormuComponent,
    SiparisFormuComponent,
    OlayBildirimFormuComponent,
    EngelliYemekTalepFormuComponent,
    TeklifAlmaFormuComponent,
    MalzemeTalepVeGirdiKontrolFormuComponent,
    OkulRehabilitsyonTakipFormuComponent,
    SosyaLIncelemeRaporuComponent,
    IcTetkikRaporuComponent,
    DisablitySearchWithTypeHeadComponent,
    FilterFormComponent,
    BasiYarasiDegerlendirmeFormuComponent,
    YatagaBagliEngelliBeslenmeKayitFormuComponent,
    MazeretIzniTalepFormuComponent,
    FormDefinitionComponent,
    VocationalRegistryComponent,
    FormHeaderComponent,
    FormSearchInputComponent,
    LogbookComponent,
    DisabletedActivityPlanListComponent,
    DashboardComponent,
    OrdersComponent,
    IstatistiklerComponent,
    ImageOperationComponent,
    SixImageOperationComponent,
    WorkRegistryComponent,
    EngelliIlacRaporComponent,
    PdfViewerComponent,
    EngelliMamaRaporComponent,
    EngelliVasiComponent,
    EngelliRaporlariComponent,
    EngelliBezRaporlariComponent,
    ModalComponent,
    GüncelDökümanListComponent
  ],
  providers: [GuardActive]
})
export class PagesModule {
}
