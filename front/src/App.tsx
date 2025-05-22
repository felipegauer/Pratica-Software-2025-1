import Resource from './components/Resources/Resource'

function App() {

  return (
    <div className='h-screen flex items-center justify-center'>
      <Resource 
        resourceName="207"
        professor="Mangan"
        colorBg='bg-green-500'
      />
    </div>
  )
}

export default App
