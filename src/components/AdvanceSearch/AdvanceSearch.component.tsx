import * as React from 'react';
import classNames from 'classnames';
import { IPokemonType } from '../../interfaces/pokedex/type';

import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import {
  Wrapper,
  ToggleButton,
  ContentWrapper,
  ContentWrapper_Opened,
  Filter,
  FilterAbility,
  FilterHeight,
  FilterWeight,
  FilterType,
  FilterBox,
  Range,
  RangeInput,
  Action,
  TypeList,
  TypeContainer,
  TypeName,
  TypeAction,
  HeightSmall,
  HeightMedium,
  HeightLarge,
  WeightSmall,
  WeightMedium,
  WeightLarge,
  Selected,
  SelectedType,
  SelectedValue,
} from './AdvanceSearch.module.scss';

// TODO: Remove this dummy data
const dummyData: IPokemonType[] = [
  {
    name: 'Bug',
  },
  {
    name: 'Dragon',
  },
  {
    name: 'Fairy',
  },
  {
    name: 'Fire',
  },
  {
    name: 'Ghost',
  },
  {
    name: 'Ground',
  },
  {
    name: 'Normal',
  },
  {
    name: 'Physic',
  },
  {
    name: 'Steel',
  },
  {
    name: 'Dark',
  },
  {
    name: 'Electric',
  },
  {
    name: 'Fighting',
  },
];

const AdvanceSearchComponent = () => {
  // Init choices
  const abillityElement = document.querySelector('#ability') as HTMLElement;
  if (abillityElement) new Choices(abillityElement);

  return (
    <div className={classNames('container', Wrapper)}>
      <div className={Selected}>
        <ul>
          <li>
            <span className={SelectedType}>Type:</span>
            <span className={SelectedValue}>2 Selected</span>
            <button type="button">
              <span className="fas fa-times" />
            </button>
          </li>
        </ul>
      </div>

      <button type="button" className={ToggleButton} onClick={AdvanceSearchComponent.handleToggle}>
        Show Advance Search{' '}
        <span className="fa-stack">
          <i className="fas fa-circle fa-stack-1x" />
          <i className="fas fa-angle-down fa-stack-1x" />
        </span>
      </button>

      <div className={classNames(ContentWrapper)}>
        <div className={Filter}>
          <section>
            <div className={FilterType}>
              <h2>Type &amp; Weakness</h2>
              <span>
                <strong>T</strong> = Type
              </span>
              <span>
                <strong>W</strong> = Weakness
              </span>
            </div>

            <ul className={TypeList}>
              {dummyData.map(item => (
                <li key={item.name}>
                  <div className={TypeContainer}>
                    <div className={TypeName}>{item.name}</div>
                    <div className={TypeAction}>
                      <button type="button">T</button>
                      <button type="button">W</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className={FilterAbility}>
              <h2>Ability</h2>
              <div className="dropdown dropdown__pokedrop">
                <select name="" id="ability">
                  <option value="">All</option>
                </select>
              </div>
            </div>
            <div className={FilterHeight}>
              <h2>Height</h2>
              <ul>
                <li className={classNames(FilterBox, HeightSmall)}>
                  <button type="button" />
                </li>
                <li className={classNames(FilterBox, HeightMedium)}>
                  <button type="button" />
                </li>
                <li className={classNames(FilterBox, HeightLarge)}>
                  <button type="button" />
                </li>
              </ul>
            </div>
            <div className={FilterWeight}>
              <h2>Weight</h2>
              <ul>
                <li className={classNames(FilterBox, WeightSmall)}>
                  <button type="button" />
                </li>
                <li className={classNames(FilterBox, WeightMedium)}>
                  <button type="button" />
                </li>
                <li className={classNames(FilterBox, WeightLarge)}>
                  <button type="button" />
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className={Range}>
          <h2>Number Range</h2>
          <div className={RangeInput}>
            <input type="number" className="input" name="" id="" min="1" max="1000" placeholder="1" />
            <span>-</span>
            <input type="number" className="input" name="" id="" min="1" max="1000" placeholder="1000" />
          </div>
        </div>
        <div className={Action}>
          <input className="button button-gray" type="reset" value="Reset" />
          <button className="button button-orange" type="submit">
            <span className="fas fa-search" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};
AdvanceSearchComponent.handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  const contentWrapper: HTMLDivElement | null = document.querySelector(`.${ContentWrapper}`);
  const buttonIcon: HTMLElement | null = document.querySelector(`.${Wrapper} button span i:nth-child(2)`);
  if (contentWrapper) contentWrapper.classList.toggle(ContentWrapper_Opened);
  if (buttonIcon) buttonIcon.classList.toggle('fa-angle-down');
  if (buttonIcon) buttonIcon.classList.toggle('fa-angle-up');
};
export default AdvanceSearchComponent;
