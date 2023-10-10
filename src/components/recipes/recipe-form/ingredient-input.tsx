import { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Combobox, InputBase, ScrollAreaAutosize, useCombobox } from '@mantine/core';
import { RecipeFormValues } from './recipe-form';

type IngredientInputProps = {
  form: UseFormReturnType<RecipeFormValues>;
  items: string[];
  index: number; 
}

export function IngredientInput({ form, items, index }: IngredientInputProps) {
  const combobox = useCombobox({ onDropdownClose: () => combobox.resetSelectedOption() });
  const [data, setData] = useState(items);
  const [search, setSearch] = useState('');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));
  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(value) => {
        if (value === '$create') {
          setData((current) => [...current, search]);
          form.setFieldValue(`ingredients.${index}.name`, search);
        } else {
          form.setFieldValue(`ingredients.${index}.name`, value);
          setSearch(value);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          placeholder='Ingredient'
          w='100%'
          rightSectionPointerEvents='none'
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(search || '');
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollAreaAutosize mah={200} type='scroll'>
            {options}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value='$create'>+ Create {search}</Combobox.Option>
            )}
          </ScrollAreaAutosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
