{
	let view={
		el:'.page > main',
		template:`
			<form class="form">
		        <div class="row">
		          <label>
		          歌名
		          </label>
		          <input name="name" type="text" value="__name__">
		        </div>
		        <div class="row">
		          <label>
		          歌手
		          </label>
		          <input name="singer" type="text" value="__singer__">
		        </div>
		        <div class="row">
		          <label>
		          外链
		          </label>
		          <input name="url" type="text" value="__url__">
		        </div>
		        <div class="row">
		          <label>
		          封面
		          </label>
		          <input name="cover" type="text" value="__cover__">
		        </div>
		        <div class="row">
		          <label>
		          歌词
		          </label>
		          <textarea cols=100 rows=10 name="lyrics">__lyrics__</textarea>
		        </div>
		        <div class="row actions">
		          <button type="submit">保存</button>
		        </div>
		    </form>
		`,
		render(data){
			$(this.el).html(this.template)
		}
	}
	let model={}
	let controller={
		init(view,model){
			this.view=view
			this.model=model
			this.view.render(this.model.data)
			window.eventHub.on('upload',(data)=>{
				console.log("songForm 获得了data")
				console.log(data)
			})
		}
	}
	controller.init(view,model)
}