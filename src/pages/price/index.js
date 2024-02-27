import clsx from 'clsx';
import MainLayout from '../../components/MainLayout';
import { useEffect, useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Translate from '@docusaurus/Translate';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import ContactUs from '../../components/ContactUs';


function PriceComponent() {
  const [equipment, setEquipment] = useState(55);
  const [people, setPeople] = useState(25);
  const [inspectors, setInspectors] = useState(2);
  const [equipmentMaxValue, setEquipmentMaxValue] = useState(7501);
  const [peopleMaxValue, setpeopleMaxValue] = useState(501);
  const [inspectorsMaxValue, setInspectorsMaxValue] = useState(32);
  const [equipmentCost, setEquipmentCost] = useState(0);
  const [peopleCost, setPeopleCost] = useState(0);
  const [inspectorsCost, setInspectorsCost] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [isCustomPrice, setCustomPrice] = useState(false);


  const rendeInspectorsSwitch = (param) => {

    switch (true) {
      case (param <= 1):
        return 990;
      case (param > 1 && param <= 2):
        return 1790;
      case (param > 2 && param <= 4):
        return 3000;
      case (param > 4 && param <= 8):
        return 3600;
      case (param > 8 && param <= 16):
        return 4200;
      case (param > 16 && param <= 31):
        return 7000;
      default:
        setCustomPrice(true)
        return 7000;
    }
  }

  const rendePeopleSwitch = (param) => {

    switch (true) {
      case (param <= 24):
        return 890;
      case (param > 24 && param <= 100):
        return 3290;
      case (param > 100 && param <= 175):
        return 4990;
      case (param > 175 && param <= 250):
        return 6590;
      case (param > 251 && param <= 500):
        return 12490;
      default:
        setCustomPrice(true)
        return 12490;
    }
  }

  const renderEquipmentSwitch = (param) => {

    switch (true) {
      case (param <= 50):
        return 390;
      case (param > 50 && param <= 100):
        return 690;
      case (param > 100 && param <= 500):
        return 1490;
      case (param > 500 && param <= 1500):
        return 2490;
      case (param > 1500 && param <= 2500):
        return 4490;
      case (param > 2500 && param <= 5000):
        return 5490;
      case (param > 5000 && param <= 7500):
        return 7490;
      default:
       setCustomPrice(true)
        setEquipment(param)
        return 7490;
    }
  }


  const settings = {
    fill: 'rgb(240 90 8)',
    background: 'rgb(222, 226, 230)'
  }


  const onTodoChange = (value, inputValType, indexPostion) => {

    if (inputValType == 'people') {

      setPeople(value)
      setPeopleCost(rendePeopleSwitch(value));
      setEstimatedTotal(peopleCost + equipmentCost);

    } else if (inputValType == 'equipment') {

      setEquipment(value)
      setEquipmentCost(renderEquipmentSwitch(value));
      setEstimatedTotal(peopleCost + equipmentCost);

      if(value >= equipmentMaxValue) {
      
        console.log(value , equipment, equipmentMaxValue + 'Value greter equipment >= equipmentMaxValue')
       }

    } else if (inputValType == 'inspectors') {

      setInspectors(value)
      setInspectorsCost(rendeInspectorsSwitch(value));
      setEstimatedTotal(inspectorsCost);
    }

    let isPriceHaveCastumValue =  checkIsCustomPrice(value);
    setCustomPrice(isPriceHaveCastumValue)
  }

  const checkIsCustomPrice = (value) => {

    let showCustomPopup = false;
    if(equipment == equipmentMaxValue) {
      showCustomPopup = true;
    }

    if(people == peopleMaxValue) {
      showCustomPopup = true;
    }

    if(inspectors == inspectorsMaxValue) {
      showCustomPopup = true;
    }
    
    return showCustomPopup

  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      setPeopleCost(rendePeopleSwitch(people));
      setEquipmentCost(renderEquipmentSwitch(equipment));
      setInspectorsCost(rendeInspectorsSwitch(inspectors));
      setEstimatedTotal(rendePeopleSwitch(people) + renderEquipmentSwitch(equipment));
    }

    return () => {
      ignore = true;
    }

  }, [equipment,people, inspectors]);

  const returnValOfRangeBgColor = (min, max) => {

    return 100 * (min) / (max);

  }

  return (
    <>
      <section className="pricing_calculator_section section-pd">
        <div className="container">
            <h2>Pricing Calculator<span className='orange'>.</span></h2>
          <div className="pricing-center">
            <div className="tab-container">
              <Tabs className="tabs-menu">
                <TabItem value="digiQuip" label="DigiQuip" default>
                  <div className="w-tab-content">
                    <div className="w-tab-pane w--tab-active">

                      <div className='tab-nav-dis'>DigiQuip Lorem Ipsum has been the industry's standard dummy.</div>
                      <div className="calculator-html w-embed">
                        <div className="pricing-row">

                          <div className="pricing-left">
                            <div className="slider-container">
                              <div className="ui-set">
                                <span className="sub-heading">  Equipment </span>
                                <span className="input-container">
                                  <input type="number" min="0" value={equipment} onChange={e => onTodoChange(e.target.value, 'equipment', 0)} className="calculator-input" />
                                  {equipment > equipmentMaxValue ? <div class="tooltip">
                                    <span class="tooltiparrow"></span>
                                    <span class="tooltiptext">Choose a value less than {equipmentMaxValue}</span>
                                  </div> : ''}
                                </span>
                              </div>
                              <div className="calculator-slider">
                                <span className="slider-track" style={{ background: `linear-gradient(to right, ${settings.fill} ${returnValOfRangeBgColor(equipment, equipmentMaxValue)}%, ${settings.background} ${returnValOfRangeBgColor(equipment, equipmentMaxValue) + 0.1}%)` }}></span>
                                <input type="range" min="0" max={equipmentMaxValue} value={equipment} onChange={e => onTodoChange(e.target.value, 'equipment', 0)} id="equipmentSlider" className="calculator-input calculator-range" />

                              </div>
                            </div>


                            <div className="slider-container">
                              <div className="ui-set">
                                <span className="sub-heading"> People </span>
                                <span className="input-container">
                                  <input type="number" min="0" value={people} onChange={e => onTodoChange(e.target.value, 'people', 1)} id="participantsInput" className="calculator-input" />
                                  {people > peopleMaxValue ? <div class="tooltip">
                                    <span class="tooltiparrow"></span>
                                    <span class="tooltiptext">Choose a value less than {peopleMaxValue}</span>
                                  </div> : ''}
                                </span>
                              </div>
                              <div className="calculator-slider">
                                <span className="slider-track" style={{ background: `linear-gradient(to right, ${settings.fill} ${returnValOfRangeBgColor(people, peopleMaxValue)}%, ${settings.background} ${returnValOfRangeBgColor(people, peopleMaxValue) + 0.1}%)` }}></span>
                                <input type="range" min="0" max={peopleMaxValue} value={people} onChange={e => onTodoChange(e.target.value, 'people', 1)} id="peopleSlider" className="calculator-input calculator-range" />

                              </div>
                            </div>
                          </div>



                          <div className="pricing-right">
                            {!isCustomPrice && <div className='calculator-one'>
                              <div className='calculator-view'>
                                <h6>
                                  <img src='img/estimated-cost.svg' /> Your estimated  cost
                                </h6>
                              </div>
                              <div className='calculator-price'>

                                {equipmentCost > 0 && <div className="ui-set cost-section">
                                  <span className="sub-heading">Equipment</span>
                                  <span id="confCost">kr {equipmentCost}</span>
                                  {equipment > 0 && <div className="conferencing-cost-text">
                                    <span className="avg-call-length-small">( <span id="confMinutes">1</span> to {equipment} equipment)
                                    </span>
                                    <img alt="" src="img/info-icon.svg" />
                                  </div>}
                                  <hr className="calculator-hr" />
                                </div>}


                                {peopleCost > 0 && <div className="ui-set cost-section">
                                  <span className="sub-heading">People</span>
                                  <span id="confCost">kr {peopleCost}</span>
                                  {people > 0 && <div className="conferencing-cost-text">
                                    <span className="avg-call-length-small">( <span id="confMinutes">1</span> to {people} people)
                                    </span>
                                    <img alt="" src="img/info-icon.svg" />
                                  </div>}
                                  <hr className="calculator-hr" />
                                </div>}


                                <div className="ui-set est">
                                  <span className="est-text">Estimated Total</span>
                                  <span className="total-cost-text" id="videototalCost">kr {equipmentCost + peopleCost}</span>
                                </div>
                                <div className="btn-container">
                                  <a href="#" target="_blank">
                                    <button className="calculator-button" disabled={!estimatedTotal}>
                                      <span className="btn-t-1">Start building</span>
                                    </button>
                                  </a>
                                  <div className="calculator-link">
                                    <a href="#" target="_blank">Talk to one of our experts</a>
                                  </div>
                                </div>
                              </div>
                            </div>}

                            {/* popup calculator */}

                            {isCustomPrice && <CustomPricePopUp />}
                            <a href='#' className='startupcost'>Startup Cost 5000 kr </a>
          

                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </TabItem>

                <TabItem value="brareg" label="Brareg">


                  <div className="w-tab-content">
                    <div className="w-tab-pane w--tab-active">
                    <div class="tab-nav-dis">Brareg Lorem Ipsum has been the industry's standard dummy.</div>
                      <div className="calculator-html w-embed">
                        <div className="pricing-row">
                          <div className="pricing-left">
                            <div className="slider-container">
                              <div className="ui-set">
                                <span className="sub-heading">  Inspectors </span>
                                <span className="input-container">
                                  <input type="number" min="0" value={inspectors} onChange={e => onTodoChange(e.target.value, 'inspectors', 0)} className="calculator-input" />
                                  {inspectors > inspectorsMaxValue ? <div class="tooltip">
                                    <span class="tooltiparrow"></span>
                                    <span class="tooltiptext">Choose a value less than {inspectorsMaxValue}</span>
                                  </div> : ''}
                                </span>
                              </div>
                              <div className="calculator-slider">
                                <span className="slider-track" style={{ background: `linear-gradient(to right, ${settings.fill} ${returnValOfRangeBgColor(inspectors, inspectorsMaxValue)}%, ${settings.background} ${returnValOfRangeBgColor(inspectors, inspectorsMaxValue) + 0.1}%)` }}></span>
                                <input type="range" min="0" max={inspectorsMaxValue} value={inspectors} onChange={e => onTodoChange(e.target.value, 'inspectors', 0)} className="calculator-input calculator-range" />
                              </div>
                            </div>
                          </div>

                          <div className="pricing-right">
                            {!isCustomPrice && <div className='calculator-one'>
                              <div className='calculator-view'>
                                <h6>
                                  <img src='img/estimated-cost.svg' /> Your estimated  cost
                                </h6>
                              </div>
                              <div className='calculator-price'>
                                {inspectorsCost > 0 && <div className="ui-set cost-section">
                                  <span className="sub-heading">Equipment</span>
                                  <span id="confCost">kr {inspectorsCost}</span>
                                  {inspectors > 0 && <div className="conferencing-cost-text">
                                    <span className="avg-call-length-small">( <span id="confMinutes">1</span> to {inspectors} equipment)
                                    </span>
                                    <img alt="" src="img/info-icon.svg" />
                                  </div>}
                                  <hr className="calculator-hr" />
                                </div>}

                                <div className="ui-set est">
                                  <span className="est-text">Estimated Total</span>
                                  <span className="total-cost-text" id="videototalCost">kr {inspectorsCost}</span>
                                </div>
                                <div className="btn-container">
                                  <a href="#" target="_blank">
                                    <button className="calculator-button" disabled={!estimatedTotal}>
                                      <span className="btn-t-1">Start building</span>
                                    </button>
                                  </a>
                                  <div className="calculator-link">
                                    <a href="#" target="_blank">Talk to one of our experts</a>
                                  </div>
                                </div>
                              </div>
                            </div>}
                            {isCustomPrice && <CustomPricePopUp />}
                            <a href='#' className='startupcost'>Startup Cost 5000 kr </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </TabItem>
              </Tabs>
            </div>
           
          </div>
        </div>
      </section>
    </>
  )
}



function CustomPricePopUp() {
  return (
    <>
      <div className="calculator-count">
        <div className="c2-v2-content">
          <img alt="build" src="img/calc-edit.svg" />
          <div className="alt-view-heading">Let's build a <br />custom plan </div>
          <div className="alt-view-content">Help us understand what you need, and we’ll propose a suitable solution for you.</div>
          <div className="btn-container">
            <a href="#" target="_blank">
              <button className="btn-t-1 calculator-button">Talk to one of our experts</button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}





function AboutIntegrations() {
  return (
    <section className='about-integrations section-pd'>
      <div className="container">
        <div className='integrations-center'>
          <h2>About our integrations<span className='orange'>.</span> </h2>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          <div className="row">
            <div className={clsx("col col--4 margin-bottom--lg")}>
                <div className='call-action'>
                <h3>integrations 01</h3>
                <p>Reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
              </div>
              <div className={clsx("col col--4 margin-bottom--lg")}>
                <div className='call-action'>
                <h3>integrations 02</h3>
                <p>Reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
              </div>

              <div className={clsx("col col--4 margin-bottom--lg")}>
                <div className='call-action'>
                <h3>integrations 02</h3>
                <p>Reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
              </div>

              <div className={clsx("col col--4 margin-bottom--lg")}>
                <div className='call-action'>
                <h3>integrations 02</h3>
                <p>Reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
              </div>

              <div className={clsx("col col--4 margin-bottom--md")}>
                <div className='call-action'>
                <h3>integrations 02</h3>
                <p>Reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
              </div>

              <div className={clsx("col col--4 margin-bottom--md")}>
                <div className='call-action'>
                <h3>integrations 02</h3>
                <p>Reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
              </div>
            
            </div>
          
        </div>
      </div>
    </section>
  )
}



function PricePageBanner() {
  return (
    <>
      <section className='homepage-banner'>
        <div className={clsx('hero-25 hero hero--primary heroBanner')}>
          <div className="container">
            <h1 className='section-title'>Our Prices<span className='orange'>.</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitet aliqua.</p>
            <div className="row">
              <SubscriptionPlan />
            </div>
          </div>
          <span className="bg"></span>
        </div>
      </section>
    </>


  );
}

// Price page
export default function About() {
  return (
    <MainLayout>

      <PricePageBanner />
      <PriceComponent />
      <AboutIntegrations />
      <ContactUs />
    </MainLayout>
  );
}