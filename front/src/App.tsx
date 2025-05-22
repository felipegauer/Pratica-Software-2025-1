import Resource from "./components/Resources/Resource";

function App() {
  return (
    <div className="h-dvh w-dvw overflow-hidden dark:bg-gray-900 bg-gray-100">
      <div className="mt-6 grid grid-cols-6 gap-4 justify-center place-items-center">
        <Resource
          resourceName="207"
          professor="Felipe Gauer"
          date="10/10"
          time="10:00"
          colorBg="bg-red-500"
        />
        <Resource
          resourceName="208"
          professor="Lucas Brenner"
          colorBg="bg-green-500"
        />
        <Resource
          resourceName="209"
          professor="Lucas Brenner"
          date="10/10"
          time="12:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="210"
          professor="Lucas Brenner"
          date="10/10"
          time="13:00"
          colorBg="bg-blue-500"
        />

        <Resource
          resourceName="207"
          professor="Felipe Gauer"
          date="10/10"
          time="10:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="208"
          professor="Lucas Brenner"
          date="10/10"
          time="11:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="209"
          professor="Lucas Brenner"
          date="10/10"
          time="12:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="210"
          professor="Lucas Brenner"
          date="10/10"
          time="13:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="207"
          professor="Felipe Gauer"
          date="10/10"
          time="10:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="208"
          professor="Lucas Brenner"
          date="10/10"
          time="11:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="209"
          professor="Lucas Brenner"
          date="10/10"
          time="12:00"
          colorBg="bg-blue-500"
        />
        <Resource
          resourceName="210"
          professor="Lucas Brenner"
          date="10/10"
          time="13:00"
          colorBg="bg-blue-500"
        />
      </div>
    </div>
  );
}

export default App;
