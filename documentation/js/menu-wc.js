'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">travel-expenses-lh documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#additional-pages"'
                            : 'data-bs-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Additional documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/overview-&amp;-setup.html" data-type="entity-link" data-context-id="additional">Overview &amp; Setup</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/architecture.html" data-type="entity-link" data-context-id="additional">Architecture</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/technical-decisions.html" data-type="entity-link" data-context-id="additional">Technical Decisions</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/App.html" data-type="entity-link" >App</a>
                            </li>
                            <li class="link">
                                <a href="components/ApproverComponent.html" data-type="entity-link" >ApproverComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ApproverTripDetailComponent.html" data-type="entity-link" >ApproverTripDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CreateTripComponent.html" data-type="entity-link" >CreateTripComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EndUserComponent.html" data-type="entity-link" >EndUserComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpenseFormComponent.html" data-type="entity-link" >ExpenseFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpenseModalComponent.html" data-type="entity-link" >ExpenseModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FinanceComponent.html" data-type="entity-link" >FinanceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FinanceTripDetailComponent.html" data-type="entity-link" >FinanceTripDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TripDetailComponent.html" data-type="entity-link" >TripDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TripDetailViewComponent.html" data-type="entity-link" >TripDetailViewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TripListComponent.html" data-type="entity-link" >TripListComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TripService.html" data-type="entity-link" >TripService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseExpense.html" data-type="entity-link" >BaseExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarRentalExpense.html" data-type="entity-link" >CarRentalExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCarRentalExpenseRequest.html" data-type="entity-link" >CreateCarRentalExpenseRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateFlightExpenseRequest.html" data-type="entity-link" >CreateFlightExpenseRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateHotelExpenseRequest.html" data-type="entity-link" >CreateHotelExpenseRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateTaxiExpenseRequest.html" data-type="entity-link" >CreateTaxiExpenseRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateTripRequest.html" data-type="entity-link" >CreateTripRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FlightExpense.html" data-type="entity-link" >FlightExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HotelExpense.html" data-type="entity-link" >HotelExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxiExpense.html" data-type="entity-link" >TaxiExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Trip.html" data-type="entity-link" >Trip</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});