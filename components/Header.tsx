export default async function Header() {
  return (
    <nav className="flex justify-between items-center px-3 bg-white">
        <div className="bg-cover bg-center w-32 h-20" style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/e65a/9814/8a3d1d87484fc8f49bfd5b7afb3f4ad6?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DNCFHHlWMhc50e1GemULx9hE7H38ygudI4OqyYGUdp5IeP-xHwnBJCwe7lQCwUA01rMVMGsj8-QYll9Dscz57RPE1N1nxsZBL92UsVpscvwuuryFROqbOQfxKksxk5HOs5agVcl1qLaE68gqn1DrlNKls733w8-tdBQub4x4Y-KIfGQRKIamca0BjBNOpdK-Hy~UkqF9qjUDdSMtycc95BcgcZRCEseAm-5M4zOgyUNejlYWnOt6cMC~ufE9xvmUJF37TpWq5nE8uI0VO44A-tdVSjKgawiD6DSwznQS849oYmdaSwXPZDTqt9UrmJ0yL6Rwm7uv1Oh1nLSlWOpBNA__')`}}></div>
        <div className="btns">
            <button className='me-2 text-sm font-semibold leading-6 rounded-md py-2.5 px-6 bg-white hover:bg-slate-200'>Login</button>
            <button className='rounded-md border border-indigo-500 bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign Up</button>
        </div>
    </nav>
  );
}