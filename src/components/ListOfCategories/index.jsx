import React, { useState, useEffect } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    window.fetch('https://petgram-server-dramirez-m36q8d9yh.now.sh/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response)
      })
  }, [])
  return (
    <List>
      {
        categories.map(category =>
          <Item key={category.id}>
            {/** Rest operator */}
            <Category {...category} />
          </Item>
        )
      }
    </List>
  )
}
