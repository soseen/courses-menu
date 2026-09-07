import {useState} from 'react'
import {useMenuStudio} from '../context/useMenuStudio'
import {PlusIcon} from '../icons'
import {AddCategoryRow, CategoryList, EmptyState, OutlineButton} from '../styles'
import {CategoryCard} from './CategoryCard'

export function MenuCategories() {
  const {addCategory, selectedMenu} = useMenuStudio()
  const categories = selectedMenu?.categories ?? []
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(categories[0]?._key ? [categories[0]._key] : []),
  )

  const toggleCategory = (categoryKey: string) => {
    setExpandedKeys((current) => {
      const next = new Set(current)
      if (next.has(categoryKey)) next.delete(categoryKey)
      else next.add(categoryKey)
      return next
    })
  }

  const handleAddCategory = () => {
    const categoryKey = addCategory()
    setExpandedKeys((current) => new Set(current).add(categoryKey))
  }

  return (
    <>
      {categories.length === 0 ? (
        <EmptyState>
          <div>
            <h3>No categories yet</h3>
            <p>Add a category such as Starters, Mains or Desserts to begin building the menu.</p>
          </div>
        </EmptyState>
      ) : (
        <CategoryList>
          {categories.map((category, index) => (
            <CategoryCard
              category={category}
              categoryCount={categories.length}
              expanded={expandedKeys.has(category._key)}
              index={index}
              key={category._key}
              onToggle={() => toggleCategory(category._key)}
            />
          ))}
        </CategoryList>
      )}

      <AddCategoryRow>
        <OutlineButton onClick={handleAddCategory} type="button">
          <PlusIcon /> Add category
        </OutlineButton>
      </AddCategoryRow>
    </>
  )
}
