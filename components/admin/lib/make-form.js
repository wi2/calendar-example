import {Form, Textarea, SplitDateTimeWidget, CharField, RegexField, SlugField, EmailField, URLField, FilePathField, GenericIPAddressField, ChoiceField, DateField, DateTimeField, BooleanField, IntegerField, FloatField, FileField, MultipleFileField, ImageField} from 'newforms'


export default function(formItem, data) {
  let mobj = {};
  if (formItem) {
    for(let i=0,len=formItem.length; i<len; i++) {
      let item = formItem[i];
      if (['id','createdAt','updatedAt'].indexOf(item.label) === -1) {
        console.log(item)
        let params = item;
        if (data && data[item.label])
          params.initial = data[item.label];
        else if (item.defaultsTo)
          params.initial = item.defaultsTo;
        delete params.defaultsTo;

        switch(item.input) {
          case 'binary':  if (data && data[item.label])
                            params.initial = getFile(item.label, data[item.label])
                          mobj[item.label] = FileField(params); break;
          case 'image':   if (data && data[item.label])
                            params.initial = getFile(item.label, data[item.label])
                          mobj[item.label] = ImageField(params); break;
          case 'email':   mobj[item.label] = EmailField(params); break;
          case 'url':     mobj[item.label] = URLField(params); break;
          case 'urlish':  mobj[item.label] = FilePathField(params); break;
          case 'ipv4':    mobj[item.label] = GenericIPAddressField(params, 'ipv4'); break;
          case 'ipv6':    mobj[item.label] = GenericIPAddressField(params, 'ipv6'); break;
          case 'text':    params.widget = Textarea;
          case 'string':  mobj[item.label] = CharField(params); break;
          case 'regex':   mobj[item.label] = RegexField(eval(item.pattern), params); break;
          case 'slug':    mobj[item.label] = SlugField(params); break;
          case 'integer': mobj[item.label] = IntegerField(params); break;
          case 'float':   mobj[item.label] = FloatField(params); break;
          case 'date':    mobj[item.label] = DateField(params); break;
          case 'datetime':params.widget = SplitDateTimeWidget;
                          if (data)
                            params.initial = new Date(data[item.label]);
                          mobj[item.label] = DateTimeField(params); break;
          case 'boolean': mobj[item.label] = BooleanField(params); break;
          case 'choice':  params.choices = item.in;
                          mobj[item.label] = ChoiceField(params); break;
        }
      }
    }
  }
  return Form.extend(mobj);
}

function getFile(name, url) {
  function CurrentFile(){
    this.name = name;
    this.url = url;
  }
  CurrentFile.prototype.toString = function() { return this.name }
  return new CurrentFile(name, url);
}
