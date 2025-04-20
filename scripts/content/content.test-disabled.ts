// import { getProjectBySlug, getProjectImages } from '.'

// jest.setTimeout(20000)

// describe('lib/content', () => {
//   test('getProjectSlugs', async () => {
//     const slugs: string[] = getProjectSlugs()
//     expect(slugs).toContain('ipixelpad')
//   })

//   test('getProjectBySlug', async () => {
//     const project = await getProjectBySlug('ipixelpad')
//     expect(project).toBeDefined()
//     expect(project.images[0].src).toContain('ipixelpad')
//   })

//   test('getProjectBySlug returns early', async () => {
//     const project = await getProjectBySlug('gibberish')
//     expect(project).not.toBeDefined()
//   })

//   test('getProjectImages', async () => {
//     const images = await getProjectImages('ipixelpad')
//     expect(images).toBeDefined()
//     expect(images[0].src).toContain('ipixelpad')
//     // expect(images[0].blurDataUrl).toBeDefined()
//     expect(images[0].width).toBeDefined()
//     expect(images[0].height).toBeDefined()
//     expect(images[0].format).toBeDefined()
//   })

//   test('getAllProjects', async () => {
//     const projects = await getAllProjects([
//       'title',
//       'description',
//       'slug',
//       'images',
//       'techstack',
//       'links'
//     ])
//     expect(projects).toBeDefined()
//   })

//   test('getAllProjects without fields', async () => {
//     const projects = await getAllProjects()
//     expect(projects).toBeDefined()
//   })
// })
